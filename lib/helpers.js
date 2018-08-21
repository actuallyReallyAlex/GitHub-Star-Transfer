const inquirer = require('inquirer');
const clear = require('clear');
const gradient = require('gradient-string');
const figlet = require('figlet');
const boxen = require('boxen');
const Configstore = require('configstore');
const ora = require('ora');
const chalk = require('chalk');
// const PrettyError = require('pretty-error'); // ! Remember to install when you have WiFi

// Create instance of config file
const conf = new Configstore('github-star-transfer');

/**
 * Main Menu Questions Object.
 */
const mainMenuQuestions = {
	type: 'list',
	name: 'main',
	message: 'What would you like to do?',
	choices: ['Copy Stars', separator(), 'Settings', 'Exit']
};

/**
 * Settings Menu Questions Object
 */
const settingsMenuQuestions = {
	type: 'list',
	name: 'settings',
	message: 'SETTINGS',
	choices: [
		'Edit User Credentials',
		'View User Accounts',
		separator(),
		'Main Menu',
		'Exit'
	]
};

/**
 * Exit Menu Questions Object
 */
const exitMenuQuestions = {
	type: 'list',
	name: 'exit',
	message: 'Are you sure you want to quit GitHub Star Transfer?',
	choices: ['Yes', separator(), 'No (Back)']
};

/**
 * 1st Set of Setup Menu Questions
 */
const setupMenuQuestions1 = [
	{
		name: 'user1Username',
		type: 'input',
		message: 'Enter the username for the account to transfer from:',
		validate: function(value) {
			if (value.length) {
				return true;
			} else {
				return "Please enter the account's username.";
			}
		}
	},
	{
		name: 'user1Password',
		type: 'password',
		message: 'Enter the password for the account to transfer from:',
		validate: function(value) {
			if (value.length) {
				return true;
			} else {
				return "Please enter the account's password.";
			}
		}
	},
	{
		name: 'user2Username',
		type: 'input',
		message: 'Enter the username for the account to transfer to:',
		validate: function(value) {
			if (value.length) {
				return true;
			} else {
				return "Please enter the account's username.";
			}
		}
	},
	{
		name: 'user2Password',
		type: 'password',
		message: 'Enter the password for the account to transfer to:',
		validate: function(value) {
			if (value.length) {
				return true;
			} else {
				return "Please enter the account's password.";
			}
		}
	}
];

/**
 * Edit User Credentials Question Object
 */
const editUserCredentialsQuestions1 = {
	type: 'list',
	name: 'credentials1',
	message: 'Which account credentials would you like to edit?',
	choices: [
		'Account 1 - (Transfer FROM)',
		'Account 2 - (Transfer TO)',
		separator(),
		'Back'
	]
};

const viewUserAccountQuestions = {
	type: 'confirm',
	name: 'viewAccounts',
	message: 'Return to main menu?'
};

/**
 * Stops the program from continuing for a set duration of milliseconds.
 * @param {Number} ms - Number of milliseconds to wait.
 * @param {Function=} [func=''] - (Optional). Function to call once number of milliseconds to wait has passed.
 * @returns {Promise}
 */
function timeout(ms, func = '') {
	if (func) {
		return new Promise(resolve => setTimeout(resolve, ms))
			.then(func)
			.catch(error => console.log('Error on timeout.\n', error.message));
	} else {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

/**
 * Creates a menu to display to the user.
 * @param {Array|Object} questions - An array of questions to ask the user, containing a Question Object, or the Question Object directly.
 * @param {String=} [menuType='main'] - A string to indicate which menu should be created. Default is 'main' for Main Menu.
 * @param {String=} [previousMenu='main'] - A string to indicate the previous menu the user was on. Mainly used with the 'Exit' menu.
 */
function createMenu(questions, menuType = 'main', previousMenu = 'main') {
	const menus = {
		settings: {
			title: 'Settings Menu',
			questions: settingsMenuQuestions
		},
		edit: {
			title: 'Edit User Credentials',
			questions: editUserCredentialsQuestions1
		}
	};

	// Show Menu Screen
	inquirer
		.prompt(questions)
		.then(answer => {
			// answer is an object with questions.name as the key and the userResponse as the value
			// Main Menu
			if (menuType === 'main') {
				switch (answer[questions.name]) {
					case 'Copy Stars':
						clear();
						printTitle('Copy Stars Menu');
						// Open a browser instance
						// Open a new page in browser
						// Navigate to github.com
						// Log in as User Account 1
						// Navigate to starred repositories
						// Find all links that are the starred repositories
						// Create a document with all links.
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

						// ! DEMONSTRATION SPINNERS
						const spinner = ora('Opening browser instance ...').start();
						timeout(2000, () => {
							spinner.succeed('Browser opened.');
							const spinner2 = ora('Opening new page in browser ...').start();
							timeout(2000, () => {
								spinner2.succeed('New paged opened.');
								const spinner3 = ora(
									'Navigating to https://www.github.com/ ...'
								).start();
								timeout(2000, () => {
									spinner3.succeed(
										'Successfully navigated to https://www.github.com/.'
									);
									const spinner4 = ora(
										`Logging in as ${chalk.green(
											conf.get('user1Username')
										)} ...`
									).start();
									timeout(2000, () => {
										spinner4.succeed(
											`Logged in as ${chalk.green(conf.get('user1Username'))}.`
										);
										const spinner5 = ora(
											'Creating list of starred repositories ...'
										).start();
										timeout(2000, () => {
											spinner5.succeed('List created.');
											const spinner6 = ora('Closing page ...').start();
											timeout(2000, () => {
												spinner6.succeed('Page closed.');
												const spinner7 = ora('Opening new page ...').start();
												timeout(2000, () => {
													spinner7.succeed('New page opened.');
													const spinner8 = ora(
														'Navigating to https://www.github.com/ ...'
													).start();
													timeout(2000, () => {
														spinner8.succeed(
															'Successfully navigated to https://www.github.com/.'
														);
														const spinner9 = ora(
															`Logging in as ${chalk.green(
																conf.get('user2Username')
															)} ...`
														).start();
														timeout(2000, () => {
															spinner9.succeed(
																`Logged in as ${chalk.green(
																	conf.get('user2Username')
																)}.`
															);
														});
													});
												});
											});
										});
									});
								});
							});
						});

						break;

					case 'Settings':
						clear();
						printTitle('Settings Menu');
						createMenu(settingsMenuQuestions, 'settings');
						break;

					case 'Exit':
						clear();
						printTitle('Exit Menu');
						createMenu(exitMenuQuestions, 'exit');
						break;

					default:
						console.log('There was an error during main menu construction.');
						console.log({answer: answer});
						console.log({questions: questions});
						break;
				}
				// Settings Menu
			} else if (menuType === 'settings') {
				switch (answer[questions.name]) {
					case 'Edit User Credentials':
						clear();
						printTitle('Edit User Credentials');
						createMenu(editUserCredentialsQuestions1, 'edit', 'settings');
						break;

					case 'View User Accounts':
						clear();
						printTitle('User Accounts');
						const userAccount1 = {
							username: conf.get('user1Username'),
							password: conf.get('user1Password')
						};

						const userAccount2 = {
							username: conf.get('user2Username'),
							password: conf.get('user2Password')
						};

						console.log(chalk.green('Account 1 (Transfering stars FROM)'));
						console.log(`\tUsername: ${userAccount1.username}`);
						console.log(`\tPassword: ${userAccount1.password}`);
						console.log(chalk.green('Account 2 (Transfering stars TO)'));
						console.log(`\tUsername: ${userAccount2.username}`);
						console.log(`\tPassword: ${userAccount2.password}`);
						timeout(1500, () => {
							createMenu(viewUserAccountQuestions, 'account', 'main');
						});
						break;

					case 'Main Menu':
						clear();
						printTitle('Main Menu');
						createMenu(mainMenuQuestions);
						break;

					case 'Exit':
						clear();
						printTitle('Exit Menu');
						createMenu(exitMenuQuestions, 'exit', 'settings');
						break;

					default:
						console.log(
							'There was an error during settings menu construction.'
						);
						break;
				}
				// Edit Credentials Menu
			} else if (menuType === 'edit') {
				console.log(answer);
				switch (answer[questions.name]) {
					case 'Account 1 - (Transfer FROM)':
						clear();
						printTitle('Edit Account 1');
						createMenu(
							[setupMenuQuestions1[0], setupMenuQuestions1[1]],
							'editAccount1',
							'edit'
						);
						break;

					case 'Account 2 - (Transfer TO)':
						clear();
						printTitle('Edit Account 2');
						createMenu(
							[setupMenuQuestions1[2], setupMenuQuestions1[3]],
							'editAccount2',
							'edit'
						);
						break;

					case 'Back':
						clear();
						printTitle(menus[previousMenu].title);
						createMenu(menus[previousMenu].questions);
						break;

					default:
						console.log('There was an error during edit menu construction');
						break;
				}
				// Exit Menu
				// Edit Account 1
				// TODO: Test for success or fail
			} else if (menuType === 'editAccount1') {
				const spinner = ora('Setting credentials for Account 1').start();
				conf.set('user1Username', answer.user1Username);
				conf.set('user1Password', answer.user1Password);
				spinner.succeed('Credentials for Account 1 successfully set.');
				console.log('Returning to main menu ...');
				timeout(3000, () => {
					clear();
					printTitle('Main Menu');
					createMenu(mainMenuQuestions);
				});
				// Edit Account 2
				// TODO: Test for success or fail
			} else if (menuType === 'editAccount2') {
				const spinner = ora('Setting credentials for Account 2').start();
				conf.set('user2Username', answer.user2Username);
				conf.set('user2Password', answer.user2Password);
				spinner.succeed('Credentials for Account 2 successfully set.');
				console.log('Returning to main menu ...');
				timeout(3000, () => {
					clear();
					printTitle('Main Menu');
					createMenu(mainMenuQuestions);
				});
			} else if (menuType === 'account') {
				switch (answer[questions.name]) {
					case true:
						clear();
						printTitle('Main Menu');
						createMenu(mainMenuQuestions);
						break;

					case false:
						console.log(
							"When you're ready, please respond 'Yes' to return to the main menu."
						);
						timeout(2000, () => {
							createMenu(viewUserAccountQuestions, 'account', 'main');
						});
						break;

					default:
						break;
				}
			} else if (menuType === 'exit') {
				if (previousMenu !== 'main') {
					switch (answer[questions.name]) {
						case 'Yes':
							clear();
							printTitle('Goodbye!');
							timeout(2000, clear);
							break;

						case 'No (Back)':
							clear();
							printTitle(menus[previousMenu].title);
							createMenu(menus[previousMenu].questions);
							break;

						default:
							console.log('There was an error during exit menu construction.');
							break;
					}
					// Menu before Exit Menu
				} else {
					// Previous Menu = Main Menu
					switch (answer[questions.name]) {
						case 'Yes':
							clear();
							printTitle('Goodbye!');
							timeout(2000, clear);
							break;

						case 'No (Back)':
							clear();
							printTitle('Main Menu');
							createMenu(mainMenuQuestions);
							break;

						default:
							console.log('There was an error during exit menu construction.');
							break;
					}
				}
				// Initial Setup Menu
			} else if (menuType === 'setup') {
				// Setup Menu(s)
				if (questions.name === 'setupStart') {
					// First prompt, asking user to proceed
					switch (answer[questions.name]) {
						// The user responded that they are ready to proceed
						case true:
							clear();
							console.log('Great!');
							timeout(1000, () => {
								console.log(
									'First, we need to know the credentials for the GitHub account that has the starred repositories you would like to transfer.'
								);
							});
							// Prompt user for credentials of both GitHub accounts
							timeout(3000, () => {
								createMenu(setupMenuQuestions1, 'setup');
							});
							break;

						// The user responded that they are not ready to proceed
						case false:
							console.log('DO NOT PROCEED');
							break;

						default:
							console.log('There was an error during setup menu construction.');
							break;
					}
					// If the prompt was asking the user for initial account credentials
				} else if (questions[0].name === 'user1Username') {
					// Save both account credentials to config file
					// * answer seems to be an `object`, but does not have the typical properties of an object
					// * otherwise, a simple forEach() would work here
					// User1 - Username
					conf.set('user1Username', answer.user1Username);
					// User1 - Password
					conf.set('user1Password', answer.user1Password);
					// User 2 - Username
					conf.set('user2Username', answer.user2Username);
					// User 2 - Password
					conf.set('user2Password', answer.user2Password);

					// Set `firstTime` to false
					conf.set('firstTime', false);
				}
			}
		})
		.catch(error => {
			console.log('Error reached within Main Menu.', error.message);
		});
}

/**
 * Displays a title screen in a pastel color.
 * @param {String} title - Text to display in title.
 * @todo - Allow you to pick other gradients.
 */
function printTitle(title) {
	// Print Title Screen in Pastel Color
	console.log(
		boxen(gradient.pastel(figlet.textSync(title)), {
			borderColor: 'magenta',
			borderStyle: 'round',
			float: 'center'
		})
	);
}

/**
 * Generates a separator to display in the menu with Inquirer.
 */
function separator() {
	return new inquirer.Separator();
}

module.exports = {
	timeout,
	createMenu,
	printTitle,
	separator
};
