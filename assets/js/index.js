// Track Your Peeps - Employee Database Management System
// index.js - Main JavaScript file for the application

// Package Imports
const dotenv = require("dotenv")
//
dotenv.config();
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");



// MySQL Connection Test
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    start();
});

// Start Function
function start() {
    inquirer.prompt({
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
            "Exit"
        ]
    }).then(function(answer) {
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
                connection.end();
                break;
        }
    });
}
