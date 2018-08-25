const inquirer = require('inquirer');

/**
 * Generates a separator to display in the menu with Inquirer.
 */
function separator() {
	return new inquirer.Separator();
}

/**
 * Settings Menu Questions Object
 */
const settingsMenuQuestions = {
	type: 'list',
	name: 'settings',
	message: 'SETTINGS',
	choices: [
		'Edit User Credentials',
		'View User Accounts',
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

const setupStartQuestions = {
    type: 'confirm',
    name: 'setupStart',
    message: 'Are you ready to proceed?'
};

/**
 * 1st Set of Setup Menu Questions
 */
const setupMenuQuestions1 = [
	{
		name: 'user1Username',
		type: 'input',
		message: 'Enter the username for the account to transfer from:',
		validate: function(value) {
			if (value.length) {
				return true;
			} else {
				return "Please enter the account's username.";
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
				return "Please enter the account's password.";
			}
		}
	},
	{
		name: 'user2Username',
		type: 'input',
		message: 'Enter the username for the account to transfer to:',
		validate: function(value) {
			if (value.length) {
				return true;
			} else {
				return "Please enter the account's username.";
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
				return "Please enter the account's password.";
			}
		}
	}
];

/**
 * Edit User Credentials Question Object
 */
const editUserCredentialsQuestions1 = {
	type: 'list',
	name: 'credentials1',
	message: 'Which account credentials would you like to edit?',
	choices: [
		'Account 1 - (Transfer FROM)',
		'Account 2 - (Transfer TO)',
		separator(),
		'Back'
	]
};

const viewUserAccountQuestions = {
	type: 'confirm',
	name: 'viewAccounts',
	message: 'Return to main menu?'
};

module.exports = {
    editUserCredentialsQuestions1,
    exitMenuQuestions,
    settingsMenuQuestions,
    setupMenuQuestions1,
    setupStartQuestions,
    viewUserAccountQuestions
}