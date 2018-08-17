const inquirer = require('inquirer');
const clear = require('clear');
const gradient = require('gradient-string');
const figlet = require('figlet');
const boxen = require('boxen');
const Configstore = require('configstore');
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
		'Setting 1',
		'Setting 2',
		'Setting 3',
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
		message:
			'Enter the username for the account to transfer from:',
		validate: function(value) {
			if (value.length) {
				return true;
			} else {
				return 'Please enter the account\'s username.';
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
				return 'Please enter the account\'s password.';
			}
		}
	},
	{
		name: 'user2Username',
		type: 'input',
		message:
			'Enter the username for the account to transfer to:',
		validate: function(value) {
			if (value.length) {
				return true;
			} else {
				return 'Please enter the account\'s username.';
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
				return 'Please enter the account\'s password.';
			}
		}
	}
];

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
	// Show Menu Screen
	inquirer
		.prompt(questions)
		.then(answer => {
			// answer is an object with questions.name as the key and the userResponse as the value
			// Main Menu
			if (menuType === 'main') {
				switch (answer[questions.name]) {
					case 'Copy Stars':
						// Copy Stars Functionality
						console.log('COPY STARS');
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
					case 'Setting 1':
						console.log('SETTING 1');
						break;

					case 'Setting 2':
						console.log('SETTING 2');
						break;

					case 'Setting 3':
						console.log('SETTING 3');
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
			// Exit Menu
			} else if (menuType === 'exit') {
				if (previousMenu !== 'main') {
					const menus = {
						settings: {
							title: 'Settings Menu',
							questions: settingsMenuQuestions
						}
					};
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
								createMenu(
									setupMenuQuestions1,
									'setup'
								);
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
	separator,
	mainMenuQuestions,
	settingsMenuQuestions,
	exitMenuQuestions
};
