#!/usr/bin/env node

const figlet = require("figlet");
const inquirer = require("inquirer");
const gradient = require("gradient-string");

const startMenu = require('./lib/start-menu');

const run = () => {
    // Print Title Screen
    console.log(gradient.pastel(figlet.textSync('GitHub Star Transfer')));

    // Show Menu Screen
    inquirer.prompt(startMenu.actions)
        .then(answer => console.log(answer));  
};

run();