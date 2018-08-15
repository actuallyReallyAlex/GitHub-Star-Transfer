const inquirer = require('inquirer');
const clear = require('clear');
const figlet = require('figlet');
const gradient = require('gradient-string');

const mainMenu = require('../mainMenu');
const exitMenu = require('../exitMenu');

const settingsActions = {
	type: 'list',
	name: 'settings',
	message: 'SETTINGS',
	choices: ['Setting 1', new inquirer.Separator(), 'Main Menu', 'Exit']
};

function displaySettingsPrompt() {
	// Display Settings Title
	console.log(gradient.pastel(figlet.textSync('Settings Menu')));
	// Prompt
	inquirer.prompt(settingsActions).then(answer => {
		// answer is an object with 'mainMenu' as the key and the answer as the value
		// Set choice variable to the value
		var choice = answer.settings;
		switch (choice) {
			case 'Main Menu':
				clear();
				mainMenu.displayMainMenu();
				break;
			
			case 'Exit':
				clear();
				exitMenu.confirmExit('settingsMenu');
				break;

			default:
				console.log(answer);
				break;
		}
	}).catch(error => {
		console.log('Error reached within Settings Menu.\n',  error.message);
	});
}

module.exports = {
	settingsActions,
	displaySettingsPrompt
};
