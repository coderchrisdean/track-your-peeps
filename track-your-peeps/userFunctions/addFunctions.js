const EmployeeData = require("../EmpData");
const cTable = require("console.table");
const inquirer = require("inquirer");

const lineBreak = "\n";

// create a new EmployeeData object to query the database
const data = new EmployeeData();

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// Add an employee
const addEmployee = async () => {
    try {
        // get list of roles and employees (managers) to populate the inquirer prompts
        const [roles, employees] = await Promise.all([data.getRoles(), data.getEmployees()]);

        // prompt the user for the new employee's information
        const newEmployee = await promptUser([
            {
                type: "input",
                message: "Enter the employee's first name:",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter the employee's last name:",
                name: "last_name"
            },
            {
                name: "employee_role",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    roles.forEach((role) => {
                        const roleObj = {
                            name: role.title,
                            value: role.id
                        }
                        choiceArray.push(roleObj)
                    })
                    return choiceArray;
                },
                message: "Choose the employee's role:"
            },
            {
                name: "employee_manager",
                type: "list",
                choices: function () {
                    const choiceArray = [{ name: "None", value: -1 }];
                    employees.forEach((employee) => {
                        const mgrObj = {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id
                        }
                        choiceArray.push(mgrObj);
                    })
                    return choiceArray;
                },
                message: "Choose the employee's manager:"
            },


        ]);

        // create the employee in the db 
        await data.addEmployee(newEmployee);
        console.log(`\n${newEmployee.first_name} ${newEmployee.last_name} added!`);


    } catch (err) {
        console.log(err);
    }
}

// Add a Department
const addDepartment = async () => {
    try {

        // prompt the user for the name of the department
        const newDepartment = await promptUser([
            {
                type: "input",
                message: "Enter the name of the new department:",
                name: "department_name"
            },
        ]);

        // create the department in the db
        await data.addDepartment(newDepartment);
        console.log(`${newDepartment.department_name} department added!`);


    } catch (err) {
        console.log(err);
    }
}

// Add a role
const addRole = async () => {
    try {
        // get a list of departments to populate the inquirer prompt
        const department = await data.viewDepartments();

        // ask the user for the new role's information
        const newRole = await promptUser([
            {
                type: "input",
                message: "Enter the title of the new role:",
                name: "role_title"
            },
            {
                type: "input",
                message: "Enter the salary for this role:",
                name: "role_salary",
                validate: function (salary) {
                    const valid = /\d+/.test(salary)
                    if (valid) {
                        return true;
                    } else {
                        return "Please enter a valid number for salary.";
                    }
                }
            },
            {
                name: "role_department",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    department.forEach((dept) => {
                        const departmentObject = {
                            name: dept.department,
                            value: dept.id
                        }
                        choiceArray.push(departmentObject)
                    })
                    return choiceArray;
                },
                message: "Which department does this role belong to?"
            },

        ]);

        // push the new role to the database
        await data.addRole(newRole);
        console.log(`${newRole.role_title} role added!`);


    } catch (err) {
        console.log(err);
    }
}

module.exports = { addEmployee, addDepartment, addRole }