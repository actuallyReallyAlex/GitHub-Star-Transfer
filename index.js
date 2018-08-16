#!/usr/bin/env node

const helpers = require('./lib/helpers');

const run = () => {
	// Print Title Screen
	helpers.printTitle('GitHub Star Transfer');

	// Create Main Menu
	helpers.createMenu({
		type: 'list',
		name: 'mainMenu',
		message: 'What would you like to do?',
		choices: ['Copy Stars', helpers.separator(), 'Settings', 'Exit']
	});
};

run();
