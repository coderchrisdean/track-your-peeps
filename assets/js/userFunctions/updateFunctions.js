// require EmployeeData.js
const EmployeeData = require("../EmployeeData.js");
const updateEmployeeRole = require("./updateFunctions.js");

// Update Employee Role Function using async/await
const updateEmployeeRole = async () => {
    try {
        // get list of employees and roles to populate inquirer prompt
        const [employees, roles] = await Promise.all([employees.getEmployees(), employees.getRoles()]);

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
// bonus
// Update Employee Manager Function using async/await
// const updateEmployeeManager = async () => {
//     try {
//         // get list of employees to populate inquirer prompt
//         const employees = await employees.getEmployees();

//         // prompt for employee and manager information
//         const updateEmployeeManager = await inquirer.promptUser([
//         { type: "list",
//         name: "employee",
//         message: "Which employee's manager do you want to update?",
//         choices: employees },
//         { type: "list",
//         name: "manager",
//         message: "Who is the employee's new manager?",
//         choices: employees },
//         ]);
//     } catch (err) {
//         console.log(err);
//     }
// }

module.exports = { updateEmployeeRole };