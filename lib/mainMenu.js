const inquirer = require('inquirer');
const figlet = require('figlet');
const gradient = require('gradient-string');

//const settingsMenu = require('./settings/settingsMenu');

const actions = {
	type: 'list',
	name: 'mainMenu',
	message: 'What would you like to do?',
	choices: ['Copy Stars', new inquirer.Separator(), 'Settings', 'Exit']
};

function displayMainMenu() {
	// Display Main menu Title
	console.log(gradient.pastel(figlet.textSync('Main Menu')));
	// Prompt
	inquirer.prompt(actions).then(answer => {
		// answer is an object with 'mainMenu' as the key and the answer as the value
		// Set choice variable to the value
		var choice = answer.mainMenu;
		switch (choice) {
			case 'Settings':
				clear();
				settingsMenu.displaySettingsPrompt();
				break;
			
			case 'Exit':
				clear();
				exitMenu.confirmExit('mainMenu');
				break;

			default:
				console.log(answer);
				break;
		}
	}).catch(error => {
		console.log('Error reached within Main Menu.\n', error.message);
	});
}

module.exports = {
	actions,
	displayMainMenu
};
