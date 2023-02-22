// Track Your Peeps - Employee Database Management System
// app.js - Main JavaScript file for the application

//Psuedo Code
// WHEN I start the application --
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information
//     // View the total utilized budget of a department -- ie the combined salaries of all employees in that department
// 12. bonus points: delete departments, roles, and employees, view employees by manager, view employees by department, and delete departments, roles, and employees,

const inquirer = require('inquirer');
const figlet = require("figlet");
// import all functions to be used in app.js
const view = require("./views/assets/js/userFunctions/viewFunctions");
const add = require("./views/assets/js/userFunctions/addFunctions");
const update = require("./views/assets/js/userFunctions/updateFunctions");
const remove = require("./views/assets/js/userFunctions/removeFunctions");
const dropConnection = require("./views/assets/js/userFunctions/dropConnection");

// use inquirer to prompt user for input
const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

// create object to hold the action functions to send from inquirer prompt
// will move to separate file later
const userFunctions = {
  'View All Employees': view.viewEmployees,
  'View All Employees By Department': view.viewDepartments,
  'View All Employees By Manager': view.viewAllEmployeesByManager,
  'View All Roles': view.viewRoles,
  'View All Departments': view.viewDepartments,
  'Add Employee': add.addEmployee,
  'Add Role': add.addRole,
  'Add Department': add.addDepartment,
  'Update Employee Role': update.updateEmployeeRole,
  'Update Employee Manager': update.updateEmployeeManager,
  'Remove Employee': remove.removeEmployee,
  'Remove Role': remove.removeRole,
  'Remove Department': remove.removeDepartment,
  Exit: dropConnection,
};

// inquirer question - list of actions
const action = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'View All Employees By Department',
      'View All Employees By Manager',
      'View All Roles',
      'View All Departments',
      'Add Employee',
      'Add Role',
      'Add Department',
      'Update Employee Role',
      'Update Employee Manager',
      'Remove Employee',
      'Remove Role',
      'Remove Department',
      'Exit',
    ],
  },
];

// init prompt user for action
const init = async () => {
  try {
    console.log('\n-----------------------------\n');
    // call viewAllEmployees function on initialization
    await view.viewAllEmployees();
    console.log('\n-----------------------------\n');

    // prompt user for the action
    const actionResponse = await promptUser(action);
    console.log('\n-----------------------------\n');
    await userFunctions[actionResponse.action]();
    console.log('\n-----------------------------\n');

    // call init function recursively
    init();
  } catch (err) {
    console.log(err);
  }
};



// Display welcome message
const start = async () =>
  figlet("Track Your Peeps", (err, data) => {
    if (err) {
      console.log("Unexpected error: " + err);
    }
    console.log(data);

    // start the prompts after 1 second
    setTimeout(init, 1000);
  });

start();

