const inquirer = require('inquirer');
const clear = require('clear');
const figlet = require('figlet');
const gradient = require('gradient-string');

const helpers = require('./helpers');
const mainMenu = require('./mainMenu');
const settingsMenu = require('./settings/settingsMenu');

const exitActions = {
	type: 'list',
	name: 'exit',
	message: 'Are you sure you want to quit GitHub Star Transfer?',
	choices: ['Yes', new inquirer.Separator(), 'No (Back)']
};

const screens = {
	'mainMenu': () => {
		mainMenu.displayMainMenu();
	},
	'settingsMenu': () => {
		settingsMenu.displaySettingsPrompt();
	}
};

function confirmExit(previousScreen = '') {
	// Display Exit Title
	console.log(gradient.pastel(figlet.textSync('Exit Menu')));
	// Prompt
	inquirer
		.prompt(exitActions)
		.then(answer => {
			// answer is an object with 'mainMenu' as the key and the answer as the value
			// Set choice variable to the value
			var choice = answer.exit;
			switch (choice) {
				case 'Yes':
					clear();
					console.log(gradient.pastel(figlet.textSync('Goodbye!')));
					helpers.timeout(2000, clear);
					break;

				case 'No (Back)':
					// TODO: Fix this functionality
					// ! Does not run function. Error.
					if (previousScreen !== '') {
						screens[previousScreen]();
					}
					break;

				default:
					clear();
					// Load back to previousScreen
					console.log('There was an error. Returning to previous screen.');
					helpers.timeout(2000);
					break;
			}
		})
		.catch(error => {
			console.log('Error reached within Exit Menu.', error.message);
		});
}

module.exports = {
	confirmExit,
	exitActions
};
