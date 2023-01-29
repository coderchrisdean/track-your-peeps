const EmployeeData = require("../EmpData");
const cTable = require("console.table");
const inquirer = require("inquirer");
const lineBreak1 = "----------------------------------------";



// create a new object to access SQL query functions
const empData = new EmployeeData();

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// View all employees
const viewEmployees = async () => {
    try {
        // query the db for employee information and display it
        const data = await empData.getEmployees()
        console.table(data);

    } catch (err) {
        console.log(err);
    }
}

// View all roles
const viewRoles = async () => {
    try {
        // query the db for role information and display it
        const data = await empData.getRoles()
        console.table(data);

    } catch (err) {
        console.log(err)
    }
}

// View all departments
const viewDepartments = async () => {
    try {
        // query the db for department information and display it
        const data = await empData.getDepartments()
        console.table(data);

    } catch (err) {
        console.log(err)
    }
}

// Choose a department and view all of its employees
const viewEmployeesByDept = async () => {
    try {
        // get list of departments
        const departments = await empData.getDepartments();
        // ask the user for the department to view
        const chosenDept = await promptUser([
            {
                name: "dept_id",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((dept) => {
                        const departmentObject = {
                            name: dept.department,
                            value: dept.id
                        }
                        choiceArray.push(departmentObject)
                    })
                    return choiceArray;
                },
                message: "Which department's employees would you like to view?"
            },

        ]);

        // get the list of employees in the department and display it
        const data = await empData.getEmployeesByDept(chosenDept.dept_id);
        console.log(lineBreak1);
        console.table(data);

    } catch (err) {
        console.log(err)
    }
}

// select a manager and view all employees managed by that manager
const viewEmployeesByMgr = async () => {
    try {
        // retrieve a list of employees to populate the inquirer prompt
        const employees = await empData.getEmployees();
        const chosenManager = await promptUser([
            {
                name: "manager_id",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const managerObject = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: employee_id
                        }
                        choiceArray.push(managerObject)
                    })
                    return choiceArray;
                },
                message: "Which manager's employees would you like to view?"
            },

        ]);

        // get the employees with the chosen manager
        const data = await empData.getEmployeesByMgr(chosenManager.manager_id);
        // if the manager has no employees
        if (!data.length) {
            console.log("This manager has no employees.");
        } else {
            // display the manager's employees
            console.log(lineBreak1)
            console.table(data);

        }

    } catch (err) {
        console.log(err)
    }
}

// View the total utilized budget (sum of salaries of all employees) within a chosen department
const viewBudgetByDepartment = async () => {
    try {
        // get a list of departments to populate the inquirer prompt
        const departments = await empData.getDepartments();
        // prompt the user to choose a department
        const chosenDept = await promptUser([
            {
                name: "dept_id",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((dept) => {
                        const departmentObject = {
                            name: dept.department,
                            value: dept.id
                        }
                        choiceArray.push(departmentObject)
                    })
                    return choiceArray;
                },
                message: "Which department's total utilized budget would you like to view?"
            },
        ]);

        // query the database to sum the salaries of employees in the chosen department
        const data = await empData.getBudgetByDept(chosenDept.dept_id);
        // if a result is returned, display it
        if (data.length) {
            console.log("\n")
            console.table(data);

        } else {
            // otherwise, there are no employees in the department - tell the user
            console.log("This department currently has no active employees.")
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewEmployees, viewRoles, viewDepartments, viewEmployeesByDept, viewEmployeesByMgr, viewBudgetByDepartment }