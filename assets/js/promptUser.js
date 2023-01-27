const inquirer = require("inquirer");
const addEmployee = ("require ./addEmployee.js");
const addRole = ("require./addRole.js");
const addDepartment = ("require./addDepartment.js");
const viewEmployees = ("require./viewEmployees.js");
const viewRoles = ("require./viewRoles.js");
const viewDepartments = ("require./viewDepartments.js");
const updateEmployeeRole = ("require./updateEmployeeRole.js");
const dropConnection = ("require./dropConnection.js");


function promptUser() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Employee",
        "Add Role",
        "Add Department",
        "View Employees",
        "View Roles",
        "View Departments",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.start) {
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Exit":
          //end the connection if exit is selected
          dropConnection();
          break;
      }

      // pause function for 1 second
    //   setTimeout(function () {
    //     console.table(results);
    //   }, 500);
    });
}

module.exports = promptUser;
