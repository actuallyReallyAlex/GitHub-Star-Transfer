#!/usr/bin/env node

const figlet = require('figlet');
const inquirer = require('inquirer');
const gradient = require('gradient-string');
const clear = require('clear');

const mainMenu = require('./lib/mainMenu');
const settingsMenu = require('./lib/settings/settingsMenu');
const exitMenu = require('./lib/exitMenu');

console.log({mainMenu: mainMenu});
console.log({settingsMenu: settingsMenu});
console.log({exitMenu: exitMenu});

const run = () => {
	// Print Title Screen
	console.log(gradient.pastel(figlet.textSync('GitHub Star Transfer')));

	// Show Menu Screen
	inquirer.prompt(mainMenu.actions).then(answer => {
		// answer is an object with 'mainMenu' as the key and the answer as the value
		// Set choice variable to the value
		// var choice = answer.mainMenu;
		switch (answer.mainMenu) {
			case 'Settings':
				clear();
				settingsMenu.displaySettingsPrompt();
				break;

			case 'Exit':
				clear();
				exitMenu.confirmExit('mainMenu');
				break;

			default:
				console.log(answer.mainMenu);
				break;
		}
	}).catch(error => {
		console.log('Error reached within Main Function.', error.message);
	});
};

run();
