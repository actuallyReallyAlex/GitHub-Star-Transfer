const ora = require('ora');
const chalk = require('chalk');
const puppeteer = require('puppeteer');
const writeData = require('write-data');
const Configstore = require('configstore');

const conf = new Configstore('github-star-transfer');

require('pretty-error').start();

/**
 * Main function to copy stars.
 */
async function copyStars() {
	// TODO: Run a check to see if connected to WiFi.



	// Open a browser instance
	const openBrowserSpinner = ora('Opening browser instance ...').start();
	const browser = await puppeteer.launch({ headless: false });
	openBrowserSpinner.succeed('Browser opened.');

	// Open a new page in browser
	const openPage1Spinner = ora('Opening new page in browser ...').start();
	const page = await browser.newPage();
	openPage1Spinner.succeed('New page opened.');

	// Navigate to github.com
	const navigateToGitHub1Spinner = ora(
		'Navigating to https://github.com/login ...'
	).start();
	await page.goto('https://github.com/login');
	navigateToGitHub1Spinner.succeed(
		'Successfully navigated to https://github.com/login.'
	);

	// Log in as User Account 1
	const login1Spinner = ora(
		`Logging in as ${chalk.green(conf.get('user1Username'))}`
	).start();
	await page.focus('#login_field');
	await page.keyboard.type(conf.get('user1Username'));
	await page.focus('#password');
	await page.keyboard.type(conf.get('user1Password'));
	await page.click('input[type="submit"]');
	await page
		.waitForNavigation({ waitUntil: 'domcontentloaded' })
		.then(async () => {
			// Validate login via cookies
			const cookies = await page.cookies();
			const loginCookie = cookies.find(cookie => cookie.name === 'logged_in');
			if (loginCookie.value === 'no') {
				login1Spinner.fail(
					`Failed to login as ${chalk.green(conf.get('user1Username'))}`
				);
				console.log(
					'The failed attempt is most likely a result of incorrect credentials. \nPlease check your credentials and try again.'
				);
				console.log(
					`Run ${chalk.black(
						chalk.bgWhite('star-transfer')
					)} to restart program.`
				);
				console.log('Exiting program ...');
				browser.close();
				return;
			} else if (loginCookie.value === 'yes') {
				login1Spinner.succeed(
					`Successfully logged in as ${chalk.green(conf.get('user1Username'))}`
				);
			}
		});

	// Navigate to Starred Repositories Page
	const navigateToStars1Spinner = ora(
		'Navigating to starred repositories page ...'
	).start();
	await page.goto(`https://github.com/${conf.get('user1Username')}?tab=stars`);
	await page
		.waitForSelector('.js-select-button')
		.then(() => {
			navigateToStars1Spinner.succeed(
				'Successfully navigated to starred repositories page.'
			);
		})
		.catch(error => {
			console.log(error);
		});

	// Create List of Starred Repositories Spinner
	const createListSpinner = ora(
		'Creating list of starred repositories ...'
	).start();

	// Create List of Starred Repositories
	const createList = await page.evaluate(() => {
		// Number of Starred Repos in Account
		const numberOfStarredRepos = parseFloat(
			document.querySelector('[title="Stars"]').innerText.replace('Stars ', '')
		);

		// Check pagination
		if (numberOfStarredRepos < 30) {
			// All repos will be on one page

			// Repositories in an array
			var repositories = [];

			// Data needs to be in object for writeData to create json file
			var reposObject = {
				numberOfStarredRepos: numberOfStarredRepos,
				starredRepos: repositories
			};

			// Create array of divs for each repo. Div holds several bits of information.
			// No easy identifier, so this list of classes will be specific enough
			const arrayOfDivs = Array.from(
				document.querySelectorAll(
					'.col-12',
					'.d-block',
					'.width-full',
					'.py-4',
					'.border-bottom'
				)
			);

			// For each repo div, break info up into parts and push to repositories array.
			arrayOfDivs.forEach(div => {
				// Author
				const author = div.children[0].innerText.split(' / ')[0];
				// Title
				const title = div.children[0].innerText
					.split(' / ')[1]
					.replace('\n', '');
				// Description
				const description = div.children[2].innerText;
				// Language
				const languageLink = div.children[3].querySelector(
					"[itemProp='programmingLanguage']"
				);
				let language;
				if (languageLink) {
					language = languageLink.innerText.trim();
				} else {
					language = 'UNSPECIFIED';
				}
				// Star Gazers
				const starGazersLink = div.children[3].querySelector(
					`[href='/${author}/${title}/stargazers']`
				);
				let starGazers;
				if (starGazersLink) {
					starGazers = parseFloat(starGazersLink.innerText.trim());
				} else {
					starGazers = 'UNSPECIFIED';
				}
				// Forks
				const forksLink = div.children[3].querySelector(
					`[href='/${author}/${title}/network']`
				);
				let forks;
				if (forksLink) {
					forks = parseFloat(forksLink.innerText.trim());
				} else {
					forks = 'UNSPECIFIED';
				}
				// Last Updated
				const lastUpdatedSpan = div.children[3].querySelector('relative-time');
				let lastUpdated;
				if (lastUpdatedSpan) {
					lastUpdated = lastUpdatedSpan.title;
				} else {
					lastUpdated = 'UNSPECIFIED';
				}
				// URL
				const url = `https://github.com/${author}/${title}/`;

				// Info Object
				const info = {
					author: author,
					title: title,
					description: description,
					language: language,
					starGazers: starGazers,
					forks: forks,
					lastUpdated: lastUpdated,
					url: url
				};

				// Push info object to repositories array
				repositories.push(info);
			});

			return reposObject;
		} else {
			// * Need to use pagionation to get all repos
			// * All repos will be on one page

			// Number of Pages For Total Number of Starred Repos
			const numberOfPages = Math.ceil(numberOfStarredRepos / 30);
			// Pagination Container
			const pagination = document.querySelector('.pagination');
			// Next Button
			const nextButton = pagination.children[1];
			// Repositories in an array
			var repositories2 = [];

			// Data needs to be in object for writeData to create json file
			var reposObject2 = {
				numberOfStarredRepos: numberOfStarredRepos,
				starredRepos: repositories2
			};

			// Start at 1 page, and while i < numberOfPages, scrape info about starred repos.
			for (var i = 1; i < numberOfPages; i++) {
				if (i === 1) {
					// Start page. No need to click the next page button.
				} else {
					// Click next button
					page.click(nextButton);
					page.waitForNavigation({waitUntil: 'domcontentloaded'});
				}


				// Create array of divs for each repo. Div holds several bits of information.
				// No easy identifier, so this list of classes will be specific enough
				const arrayOfDivs = Array.from(
					document.querySelectorAll(
						'.col-12',
						'.d-block',
						'.width-full',
						'.py-4',
						'.border-bottom'
					)
				);

				// For each repo div, break info up into parts and push to repositories array.
				arrayOfDivs.forEach(div => {
					// Author
					const author = div.children[0].innerText.split(' / ')[0];
					// Title
					const title = div.children[0].innerText
						.split(' / ')[1]
						.replace('\n', '');
					// Description
					const description = div.children[2].innerText;
					// Language
					const languageLink = div.children[3].querySelector(
						"[itemProp='programmingLanguage']"
					);
					let language;
					if (languageLink) {
						language = languageLink.innerText.trim();
					} else {
						language = 'UNSPECIFIED';
					}
					// Star Gazers
					const starGazersLink = div.children[3].querySelector(
						`[href='/${author}/${title}/stargazers']`
					);
					let starGazers;
					if (starGazersLink) {
						starGazers = parseFloat(starGazersLink.innerText.trim());
					} else {
						starGazers = 'UNSPECIFIED';
					}
					// Forks
					const forksLink = div.children[3].querySelector(
						`[href='/${author}/${title}/network']`
					);
					let forks;
					if (forksLink) {
						forks = parseFloat(forksLink.innerText.trim());
					} else {
						forks = 'UNSPECIFIED';
					}
					// Last Updated
					const lastUpdatedSpan = div.children[3].querySelector(
						'relative-time'
					);
					let lastUpdated;
					if (lastUpdatedSpan) {
						lastUpdated = lastUpdatedSpan.title;
					} else {
						lastUpdated = 'UNSPECIFIED';
					}
					// URL
					const url = `https://github.com/${author}/${title}/`;

					// Info Object
					const info = {
						author: author,
						title: title,
						description: description,
						language: language,
						starGazers: starGazers,
						forks: forks,
						lastUpdated: lastUpdated,
						url: url
					};

					// Push info object to repositories array
					repositories2.push(info);
				});
			}

			return reposObject2;
		}
	});

	// Variable to hold data created from createList
	var listOfRepos = createList;

	// Write the data to a json file using writeData
	writeData('./exports/testList.json', listOfRepos, function(error) {
		if (error) {
			createListSpinner.fail(
				'Error occured while creating list of starred repositories.'
			);
			console.log(error);
			return;
		} else {
			createListSpinner.succeed(
				'Successfully created list of starred repositories'
			);
		}
	});

	// ! Pay attention to pagination
	// Close page
	// Open a new page (or browser, not sure)
	// Navigate to github.com
	// Log in as User Account 2
	// For each starred repository in list:
	// * Navigate to repository page
	// * Star the repository
	// Exit browser
	// Prompt user to see if they want to save the document of starred repos.
	// ! Also somehow confirm that the repositories were indeed starred.
}

module.exports = {
	copyStars
};
