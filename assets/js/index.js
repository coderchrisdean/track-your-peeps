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
const dotenv = require("dotenv")

//
dotenv.config();
const cTable = require("console.table");
const figlet = require("figlet");
const inquirer = require("inquirer");

// File Imports
const connection = require("./connect");
const startApplication = require("./startApplication");
const promptUser = require("./promptUser");
const addEmployee = require("./addEmployee");
const addRole = require("./addRole");
const addDepartment = require("./addDepartment");
const viewEmployees = require("./viewEmployees");
const viewRoles = require("./viewRoles");
const viewDepartments = require("./viewDepartments");
const updateEmployeeRole = require("./updateEmployeeRole");


const path = require("path");


// Start the application from the startApplication.js file
startApplication();






// Add Role
function addRole() {

    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the department ID for this role?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id
        }, function(err) {
            if (err) throw err;
            console.log("Role added successfully!");
            startApplication();
        });
    });
}

// add department
function addDepartment() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the department name?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO department SET ?", {
            name: answer.name
        }, function(err) {
            if (err) throw err;
            console.log("Department added successfully!");
            startApplication();
        });
    });
}

// view employees
function viewEmployees() {
    
        connection.query("SELECT * FROM employee", function(err, res) {
            if (err) throw err;
            console.table(res);
            startApplication();
        });
    }

// view roles
function viewRoles() {
        
            connection.query("SELECT * FROM role", function(err, res) {
                if (err) throw err;
                console.table(res);
                startApplication();
            });
        }

// view departments

function viewDepartments() {

    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
}

// update employee role
function updateEmployeeRole() {

    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the employee's ID?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's new role ID?"
        }
    ]).then(function(answer) {
        connection.query("UPDATE employee SET ? WHERE ?", [
            {
                role_id: answer.role_id
            },
            {
                id: answer.id
            }
        ], function(err) {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            startApplication();
        });
    });

}



