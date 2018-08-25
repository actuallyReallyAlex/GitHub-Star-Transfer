#!/usr/bin/env node

// To check if user is connected to WiFi
const isOnline = require('is-online');
// For spinners / loaders
const ora = require('ora');
// To print NodeJS errors in a more readable format
require('pretty-error').start();

// NPM Dependencies
const Configstore = require('configstore');

// Custom Dependencies
const { getStarredRepos } = require('./lib/requests');
const { printTitle, timeout, separator, createMenu, mainMenuQuestions } = require('./lib/helpers');
const { setupStartQuestions } = require('./lib/menus');

// Create a Configuration File with Configstore
const conf = new Configstore('github-star-transfer');

const run = () => {
	// Determine if User is connected to WiFi
	const connectionSpinner = ora('Testing connection ...').start();

	isOnline().then(online => {
		// If user is connected to WiFi
		if (online === true) {
			connectionSpinner.succeed('Connected to WiFi.');

			// Print Title Screen
			printTitle('GitHub Star Transfer');

			// Check if this is first time running program
			if (conf.get('firstTime') !== false) {
				// This is the user's first time
				// Walk user through set-up
				console.log(
					'It looks like this is your first time using GitHub Star Transfer.'
				);
				timeout(2000, () => {
					console.log("Let's walk through the setup process together.");
				});
				timeout(4000, () => {
					// Ask if the user is ready to proceed
					createMenu(setupStartQuestions, 'setup');
				});
			} else {
				// Create Main Menu
				createMenu(mainMenuQuestions);
			}
		} else {
			// User is not connected to WiFi
			// Launch app with limited capabilities
			connectionSpinner.fail('Not connected to WiFi.');

			// * DO STUFF

			// Print Title Screen
			printTitle('GitHub Star Transfer');
		}
	});
	// getStarredRepos();
};

// const run = () => {
// 	// Determine if User is connected to WiFi
// 	const connectionSpinner = ora('Testing connection ...').start();

// 	isOnline().then(online => {
// 		// If user is connected to WiFi
// 		if (online === true) {
// 			connectionSpinner.succeed('Connected to WiFi.');
// 			// Print Title Screen
// 			printTitle('GitHub Star Transfer');

// 			// Check if this is first time running program
// 			if (conf.get('firstTime') !== false) {
// 				// Walk user through set-up
// 				console.log(
// 					'It looks like this is your first time using GitHub Star Transfer.'
// 				);
// 				// TODO: Timeouts are running from the start of `run` being called.
// 				// * Figure out how to run timeout stacked
// 				// * i.e. the 2nd timeout doesn't have to be 4000, it can be 2000 and run after the 1st.
// 				timeout(2000, () => {
// 					console.log("Let's walk through the setup process together.");
// 				});
// 				timeout(4000, () => {
// 					// Ask if the user is ready to proceed
// 					createMenu(
// 						{
// 							type: 'confirm',
// 							name: 'setupStart',
// 							message: 'Are you ready to proceed?'
// 						},
// 						'setup'
// 					);
// 				});
// 			} else {
// 				// Create Main Menu
// 				createMenu({
// 					type: 'list',
// 					name: 'mainMenu',
// 					message: 'What would you like to do?',
// 					choices: ['Copy Stars', separator(), 'Settings', 'Exit']
// 				});
// 			}
// 		} else {
// 			// User is not connected to WiFi
// 			// Launch app with limited capabilities
// 			connectionSpinner.fail('Not connected to WiFi.');

// 			// Print Title Screen
// 			printTitle('GitHub Star Transfer');

// 			// Check if this is first time running program
// 			if (conf.get('firstTime') !== false) {
// 				// Walk user through set-up
// 				console.log(
// 					'It looks like this is your first time using GitHub Star Transfer.'
// 				);
// 				// TODO: Timeouts are running from the start of `run` being called.
// 				// * Figure out how to run timeout stacked
// 				// * i.e. the 2nd timeout doesn't have to be 4000, it can be 2000 and run after the 1st.
// 				timeout(2000, () => {
// 					console.log("Let's walk through the setup process together.");
// 				});
// 				timeout(4000, () => {
// 					// Ask if the user is ready to proceed
// 					createMenu(
// 						{
// 							type: 'confirm',
// 							name: 'setupStart',
// 							message: 'Are you ready to proceed?'
// 						},
// 						'setup'
// 					);
// 				});
// 			} else {
// 				// Create Main Menu
// 				createMenu({
// 					type: 'list',
// 					name: 'mainMenu',
// 					message: 'What would you like to do?',
// 					choices: [
// 						{
// 							name: 'Copy Stars',
// 							disabled: 'Unavailable while not connected to WiFi.'
// 						},
// 						separator(),
// 						'Settings',
// 						'Exit'
// 					]
// 				});
// 			}
// 		}
// 	});
// };

run();
