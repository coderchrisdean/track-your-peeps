const EmpData = require("./EmpData");
const connection = require("./connect.js");
const cTable = require("console.table");
const figlet = require("figlet");
const inquirer = require("inquirer");
const view = require("./userFunctions/viewFunctions");
const remove = require("./userFunctions/removeFunctions");
const add = require("./userFunctions/addFunctions.js");
const update = require("./userFunctions/updateFunctions");

const lineBreak1 = "----------------------------------------";
const lineBreak = "\n" + "----------------------------------------" + "\n";

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};


// Function to exit the application
const dropConnection = () => {
    console.log("Thanks for using Track Your Peeps. Goodbye!");
    connection.end();
    process.exit();
};

// Object to hold the option functions to fire from inquirer prompt
const userFunctions = {
    "View All Employees": view.viewEmployees,
    "View All Employees by Department": view.viewEmployeesByDept,
    "View All Employees by Manager": view.viewEmployeesByMgr,
    "View All Roles": view.viewRoles,
    "View All Departments": view.viewDepartments,
    "View Budget by Department": view.viewBudgetByDept,
    "Add Employee": add.addEmployee,
    "Add Role": add.addRole,
    "Add Department": add.addDepartment,
    "Remove Employee": remove.removeEmployee,
    "Remove Department": remove.removeDepartment,
    "Remove Role": remove.removeRole,
    "Update Employee Role": update.updateEmployeeRole,
    "Update Employee Manager": update.updateEmployeeManager,
    "Exit Application": dropConnection,
}

// Inquirer question - list of tasks
const action = [
    {
        type: "list",
        message: "Select from the following options:",
        name: "option",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Departments",
            "View Budget by Department",
            "Add Department",
            "Remove Department",
            "Exit Application"
        ]
    }
];

// Init prompt user for option to complete
const init = async () => {
    try {
        console.log(lineBreak1)
        const actionChoice = await promptUser(action);
        console.log(lineBreak)
        await userFunctions[actionChoice.option]();
        init();
    } catch (err) {
        console.log(err);
    }
};

// display title screen and continue
const start = () => {
    figlet("TrackYourPeeps!", (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(lineBreak);
    
        console.log(data);
        console.log(lineBreak1);
        console.log("Track Your Peeps Employee Management System!");
        console.log(lineBreak1);
        init();
    })

}

start();