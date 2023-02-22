// mainMenu();
// require EmployeeData.js
const EmployeeData = require("./EmployeeData.js");
// require connect.js
const connect = require("./connect.js.js");
//require cTable.js
const cTable = require("console.table");
// require inquirer.js
const inquirer = require("inquirer");
const { dropConnection } = require("./index.js.js");

// other files/commands
const { view } = require("./userFunctions/viewFunctions.js");
const { add } = require("./userFunctions/addFunctions.js");
const { remove } = require("./userFunctions/removeFunctions.js");
const { update } = require("./userFunctions/updateFunctions.js");



// line break variables
const lineBreak = "\n";
const lineBreakWithStars = "\n******************************\n";

// create new object to access SQL data
const employees = new EmployeeData();

const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "Welcome to Track Your Peeps! Are you ready to begin?",
      choices: ["Yes", "No"],
    })
    .then((answer) => {
      switch (answer.start) {
        case "Yes":
          mainMenu();
          break;
        case "No":
         dropConnection();
          break;
      }
    });
};

// main menu function
const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Add Department",
        "Remove Department",
        "View Total Utilized Budget Of A Department",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.mainMenu) {
        case "View All Employees":
          view.viewEmployees();
          break;
        case "View All Employees By Department":
          view.viewEmployeesByDepartment();
          break;
        case "View All Employees By Manager":
          view.viewEmployeesByManager();
          break;
        case "Add Employee":
          add.addEmployee();
          break;
        case "Remove Employee":
          remove.removeEmployee();
          break;
        case "Update Employee Role":
          update.updateEmployeeRole();
          break;
        case "Update Employee Manager":
          update.updateEmployeeManager();
          break;
        case "View All Roles":
          view.viewRoles();
          break;
        case "Add Role":
          add.addRole();
          break;
        case "Remove Role":
          remove.removeRole();
          break;
        case "View All Departments":
          view.viewDepartments();
          break;
        case "Add Department":
          add.addDepartment();
          break;
        case "Remove Department":
          remove.removeDepartment();
          break;
        // case "View Total Utilized Budget Of A Department":
        //   viewBudget();
        //   break;
        case "Exit":
          console.log(lineBreakWithStars);
          dropConnection();
          console.log(lineBreakWithStars);
          process.exit();
          break;  
      }
    });
  }
    //start function for initial prompt


    // export start function
    module.exports = { start };
