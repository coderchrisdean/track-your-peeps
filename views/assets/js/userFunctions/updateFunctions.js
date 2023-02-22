// require EmployeeData.js
const EmployeeData = require("../EmployeeData.js");
const inquirer = require("./inquirer");

// Update Employee Role Function using async/await
const updateEmployeeRole = async () => {
    try {
        // get list of employees and roles to populate inquirer prompt
        const [employees, roles] = await Promise.all([EmployeeData.getEmployees(), EmployeeData.getRoles()]);

        // prompt for employee and role information
        const employee = await inquirer.promptUser([
        { type: "list",
        name: "employee",
        message: "Which employee's role do you want to update?",
        choices: employees },
        { type: "list",
        name: "role",
        message: "What is the employee's new role?",
        choices: roles },
        ]);
    } catch (err) {
        console.log(err);
    }
}

// Export functions
module.exports = { updateEmployeeRole };
