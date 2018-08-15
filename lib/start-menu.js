const inquirer = require('inquirer');

const actions = {
    type: 'list',
    name: 'actionList',
    message: 'What would you like to do?',
    choices: [
        'Copy Stars',
        new inquirer.Separator(),
        'Exit'
    ]
};

module.exports = {
    actions
};