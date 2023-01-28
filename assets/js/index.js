// Track Your Peeps - Employee Database Management System
// index.js - Main JavaScript file for the application

//Psuedo Code
// GIVEN a command-line application that accepts user input
// WHEN I start the application
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

// Package Imports
const dotenv = require("dotenv");
dotenv.config();
const figlet = require("figlet");

// Variable Declarations
const connect = require("./connect");
const promptUser = require("./promptUser");
const addEmployee = require("./addFunctions");
const addRole = require("./addRole");
const addDepartment = require("./addDepartment");
const viewEmployees = require("./viewEmployees");
const viewRoles = require("./viewRoles");
const viewDepartments = require("./viewFunctions");
const updateEmployeeRole = require("./updateEmployeeRole");
const inquirer = require("inquirer");

//use inquirer to get data from user

const promptUser = () => {
  return inquirer.prompt(questions);
};

// drop connection using async/await


const dropConnection = async () => {
  await connect();
};

// create object to store functions


const userFunctions = {
  promptUser,
  dropConnection,
  addEmployee,
  addRole,
  addDepartment,
  viewEmployees,
  viewRoles,
  viewDepartments,
  updateEmployeeRole,
};

// // init promptUser function to complete inquirer prompt
// const init = async () => {

//     try {
//     const 

//     userFunctions.promptUser();


// Welcome to user to the application with figlet, connect to database, and then start prompts.
figlet.text(
  "Track Your Peeps",
  {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  },
  function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
    }
    console.log(data);
    // wait 1 second before starting prompts
    setTimeout(function () {
        connect();
        promptUser();
        }, 1000);
  }
);
