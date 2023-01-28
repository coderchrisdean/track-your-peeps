// package requirements
const inquirer = require("inquirer");

// prompt user for input using async/await
const promptUser = async (questions) => {
    return await inquirer.prompt(questions);
};

module.exports = promptUser;
