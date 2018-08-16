#!/usr/bin/env node

// NPM Dependencies
const Configstore = require('configstore');

// Custom Dependencies
const helpers = require('./lib/helpers');

// Create a Configuration File with Configstore
const conf = new Configstore('github-star-transfer');

// Initially set firstTime to true
conf.set('firstTime', true);

const run = () => {
	// Print Title Screen
	helpers.printTitle('GitHub Star Transfer');

	// Check if this is first time running program
	if (conf.get('firstTime') === true) {
		// Walk user through set-up
		console.log(
			'It looks like this is your first time using GitHub Star Transfer.'
		);
		// TODO: Timeouts are running from the start of `run` being called.
		// * Figure out how to run timeout stacked
		// * i.e. the 2nd timeout doesn't have to be 4000, it can be 2000 and run after the 1st.
		helpers.timeout(2000, () => {
			console.log("Let's walk through the setup process together.");
		});
		helpers.timeout(4000, () => {
			// Ask if the user is ready to proceed
			helpers.createMenu(
				{
					type: 'confirm',
					name: 'setupStart',
					message: 'Are you ready to proceed?'
				},
				'setupStart'
			);
		});
	} else {
		// Create Main Menu
		helpers.createMenu({
			type: 'list',
			name: 'mainMenu',
			message: 'What would you like to do?',
			choices: ['Copy Stars', helpers.separator(), 'Settings', 'Exit']
		});
	}
};

run();
