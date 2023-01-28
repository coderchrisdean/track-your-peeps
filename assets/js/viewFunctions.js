// require EmployeeData class
const EmployeeData = require('./EmployeeData');

//packages
const cTable = require('console.table');
const inquirer = require('inquirer');

// line break variables
const lineBreak = "\n";
const lineBreakWithStars = "\n******************************\n";


// use of inquirer to prompt user for input using async/await
const promptUser = async (questions) => {
    return await inquirer.prompt(questions);
};

// create new object to access SQL data
const employees = new EmployeeData();


// View All Employees Function using async/await
const viewEmployees = async () => {
    try {
        // view all employees
        const employees = await employees.viewEmployees();
        // display employees
        cTable(employees);
        console.log(lineBreak);
        console.log(lineBreakWithStars);
        // return to main menu
        promptUser();
    } catch (err) {
        console.log(err);
        console.log(lineBreak);
        console.log("An unknown error occurred, returning to main menu.");
        // return to main menu
        promptUser();
    }
};

// View Roles Function using async/await
const viewRoles = async () => {
    try {
        // get list of roles
        const roles = await employees.viewRoles();

        // display roles
        cTable(roles);
    } catch (err) {
        console.log(err);
    }
};

// View Departments Function using async/await
const viewDepartments = async () => {
    try {
        // get list of departments
        const departments = await employees.viewDepartments();
        // display departments
        cTable(departments);
    } catch (err) {
        console.log(err);
    }
};

// Select department to view all employees in that department
const viewEmployeesByDepartment = async () => {
    try {
        // get list of departments
        const departments = await employees.getDepartments();
        // ask user which department they want to view
        const choice = await inquirer.promptUser([
            {
                name: 'departmentId',
                type: 'list',
                choices: function () {
                    const choiceArr = [];
                    departments.forEach(({ id, name }) => {
                        choiceArr.push({
                            name: name,
                            value: id
                        });
                    });
                    return choiceArray;
                },
                message: 'Which department would you like to view?',
                },
            ]);

            // get list of employees by department and display
            const employeesByDept = await employees.getEmployeesByDepartment(choice.departmentId);
            // line break
            console.log("\n");
            cTable(employeesByDept);
    } catch (err) {
        console.log(err);
    }
};


// Bonus
// View Employees by Manager Function using async/await
// const viewEmployeesByManager = async () => {
//     try {
//         // get list of employees
//         const employees = await employees.getEmployees();

//         // get list of managers
//         const managers = await employees.getManagers();

//         // prompt for manager
//         const manager = await inquirer.promptUser([
//             { type: "list",
//             name: "manager",
//             message: "Which manager's employees would you like to view?",
//             choices: managers }
//         ]);

//         // get list of employees by manager
//         const employeesByManager = await employees.getEmployeesByManager(manager.manager);

//         // display employees by manager
//         console.table(employeesByManager);
//     } catch (err) {
//         console.log(err);
//     }
// }

module.exports = { viewEmployees, viewRoles, viewDepartments, viewEmployeesByDepartment, promptUser };