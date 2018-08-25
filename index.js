#!/usr/bin/env node

// Environment Variable Config
require('dotenv').config()


// To check if user is connected to WiFi
const isOnline = require('is-online');
// For spinners / loaders
const ora = require('ora');
// To print NodeJS errors in a more readable format
require('pretty-error').start();

// NPM Dependencies
const Configstore = require('configstore');

// Custom Dependencies
const { getStarredRepos, createToken } = require('./lib/requests');
const { printTitle, timeout, separator, createMenu, mainMenuQuestions } = require('./lib/helpers');
const { setupStartQuestions } = require('./lib/menus');

// Create a Configuration File with Configstore
const conf = new Configstore('github-star-transfer');

const run = () => {
	createToken();
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
// 				// This is the user's first time
// 				// Walk user through set-up
// 				console.log(
// 					'It looks like this is your first time using GitHub Star Transfer.'
// 				);
// 				timeout(2000, () => {
// 					console.log("Let's walk through the setup process together.");
// 					console.log("The app will ask you for a username and password. This is only done once.");
// 					console.log("Your information will not be stored, but it's needed temporarily to create a token.")
// 				});
// 				timeout(4000, () => {
// 					// Ask if the user is ready to proceed
// 					createMenu(setupStartQuestions, 'setup');
// 				});
// 			} else {
// 				// Create Main Menu
// 				createMenu(mainMenuQuestions);
// 			}
// 		} else {
// 			// User is not connected to WiFi
// 			// Launch app with limited capabilities
// 			connectionSpinner.fail('Not connected to WiFi.');

// 			// * DO STUFF

// 			// Print Title Screen
// 			printTitle('GitHub Star Transfer');
// 		}
// 	});
// 	// getStarredRepos();
// };

run();
