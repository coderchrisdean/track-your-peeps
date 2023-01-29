const path = require('path');
const EmployeeData = require(path.join(__dirname, '../EmployeeData.js'));
const cTable = require("console.table");
const inquirer = require("inquirer");

const employeeData = new EmployeeData();

// Use inquirer to prompt for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// View all employees
const viewAllEmployees = async () => {
    try {
        const employees = await employeeData.viewAllEmployees();
        cTable.getTable(employees);
        console.table(employees);
    } catch (err) {
        console.log(err);
    }
};

// view all roles
const viewAllRoles = async () => {
    try {
        const roles = await empData.viewAllRoles();
        cTable.getTable(roles);
        console.table(roles);
    } catch (err) {
        console.log(err);
    }
};
// view all departments
const viewAllDepartments = async () => {
    try {
        const departments = await empData.viewAllDepartments();
        cTable.getTable(departments);
        console.table(departments);
    } catch (err) {
        console.log(err);
    }
};

// choose a department and view all employees in that department
const viewEmployeesByDepartment = async () => {
    try {
        // get list of departments to populate inquirer prompt
        const departments = await empData.viewDepartments();

        // prompt for department information
        const departmentResponse = await promptUser([
            {
                type: "list",
                name: "department_id",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((department) => {
                        const departmentObject = {
                            name: department.name,
                            value: department.id,
                        };
                        choiceArray.push(departmentObject);
                    });
                    return choiceArray;
                },
                message: "Which department do you want to view?",
            },
        ]);

        // get employees from database
        const employees = await empData.viewEmployeesByDepartment(
            departmentResponse.department_id
        );
        cTable.getTable(employees);
        console.table(employees);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { viewAllEmployees, viewAllRoles, viewAllDepartments, viewEmployeesByDepartment };

            

