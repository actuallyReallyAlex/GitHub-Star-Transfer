const figlet = require('figlet');
const gradient = require('gradient-string');
const boxen = require('boxen');
const Configstore = require('configstore');
const inquirer = require('inquirer');
const clear = require('clear');
const ora = require('ora');
const isOnline = require('is-online');

const conf = new Configstore('github-star-transfer');

const {
	editUserCredentialsQuestions1,
	exitMenuQuestions,
	settingsMenuQuestions,
	setupMenuQuestions1,
	setupStartQuestions,
	viewUserAccountQuestions
} = require('./menus');

/**
 * Main Menu Questions Object.
 */
var mainMenuQuestions = {
	type: 'list',
	name: 'main',
	message: 'What would you like to do?',
	choices: ['Copy Stars', separator(), 'Settings', 'Exit']
};


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
 * Stops the program from continuing for a set duration of milliseconds.
 * @param {Number} ms - Number of milliseconds to wait.
 * @param {Function=} [func=''] - (Optional). Function to call once number of milliseconds to wait has passed.
 * @returns {Promise}
 */
function timeout(ms, func = '') {
	if (func) {
		return new Promise(resolve => setTimeout(resolve, ms))
			.then(func)
			.catch(error => console.log(error));
	} else {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

/**
 * Generates a separator to display in the menu with Inquirer.
 */
function separator() {
	return new inquirer.Separator();
}

/**
 * Creates a menu to display to the user.
 * @param {Array|Object} questions - An array of questions to ask the user, containing a Question Object, or the Question Object directly.
 * @param {String=} [menuType='main'] - A string to indicate which menu should be created. Default is 'main' for Main Menu.
 * @param {String=} [previousMenu='main'] - A string to indicate the previous menu the user was on. Mainly used with the 'Exit' menu.
 */
function createMenu(questions, menuType = 'main', previousMenu = 'main') {
	// Detect if user is connected to WiFi
	isOnline().then(online => {
		// User is not connected to WiFi
		if (online === false) {
			// Change the 'Copy Stars' option in the Main Menu Prompt to disabled.
			mainMenuQuestions.choices[0] = {
				name: 'Copy Stars',
				disabled: 'Unavailable while not connected to WiFi.'
			};
		}
	});

	const menus = {
		settings: {
			title: 'Settings Menu',
			questions: settingsMenuQuestions
		},
		edit: {
			title: 'Edit User Credentials',
			questions: editUserCredentialsQuestions1
		},
		main: {
			title: 'Main Menu',
			questions: mainMenuQuestions
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
						copyStars();
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
                    
                    // Create a token
                    // !!!!

					// Set `firstTime` to false
					conf.set('firstTime', false);
				}
			}
		})
		.catch(error => {
			console.log(error);
		});
}

module.exports = {
	printTitle,
	timeout,
	createMenu,
    separator,
    mainMenuQuestions
};
