const EmployeeData = require("../EmpData");
const cTable = require("console.table");
const inquirer = require("inquirer");

const lineBreak1 = "----------------------------------------";


// create a new EmpData db access object to access SQL query functions
const data = new EmployeeData();

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// Update employee role
const updateEmployeeRole = async () => {
    try {
        // get list of roles and employees to populate the inquirer choices
        const [roles, employees] = await Promise.all([data.getRoles(), data.getEmployees()])

        // choose an employee to update
        const updateEmployee = await promptUser([

            {
                name: "employee_id",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const employeeObject = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArray.push(employeeObject)
                    })
                    return choiceArray;
                },
                message: "Which employee's role would you like to update?"
            },

        ]);

        // choose the employee's new role
        const newRole = await promptUser([
            {
                name: "role_id",
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
                message: "Choose the employee's new role:"
            },
        ]);

        // update the employee's role in the db
        await data.updateEmployeeRole(newRole.role_id, updateEmployee.employee_id)
        console.log(lineBreak1)
        console.log("Role Updated.")

    } catch (err) {
        console.log(err);
    }

}

// update an employee's manager
const updateEmployeeManager = async () => {
    try {
        // get list of employees to populate the inquirer prompt
        const employees = await data.getEmployees();

        // choose an employee to update
        const updateEmployee = await promptUser([
            {
                name: "employee_id",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const empObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArray.push(employeeObject)
                    })
                    return choiceArray;
                },
                message: "Which employee's manager would you like to update?"
            },

        ]);

        // generate a list of employees excluding the chosen employee to populate the manager choices
        const managers = employees.filter((emp) => {
            return emp.id !== updateEmployee.employee_id
        })

        // choose a new manager for the employee
        const newMgr = await promptUser([
            {
                name: "manager_id",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    managers.forEach((mgr) => {
                        const mgrObj = {
                            name: `${mgr.first_name} ${mgr.last_name}`,
                            value: mgr.id
                        }
                        choiceArray.push(mgrObj)
                    })
                    return choiceArray;
                },
                message: "Choose the employee's new manager:"
            },
        ]);

        // update employee with new manager
        await data.updateEmployeeManager(newMgr.manager_id, updateEmployee.employee_id)
        console.log(lineBreak1)
        console.log("Manager Updated")
        console.log(lineBreak1)
    } catch (err) {
        console.log(err);
    }

}


module.exports = { updateEmployeeRole, updateEmployeeManager }