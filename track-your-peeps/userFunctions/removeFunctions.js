const EmpData = require('../EmpData');
const cTable = require('console.table');
const inquirer = require('inquirer');
const lineBreak1 = '----------------------------------------';


// create a new EmpData db access object to access SQL query functions
const empData = new EmpData();

// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// Remove an employee
const removeEmployee = async () => {
    try {

        // Get list of employees to populate inquirer choices
        const employees = await empData.getEmployees()
        const removeEmployee = await promptUser([

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
                        choiceArray.push(empObj)
                    })
                    return choiceArray;
                },
                message: "Which employee would you like to remove?"
            },

        ]);

        // Query to determine if the employee is a manager
        const [directReports, employeeToRemove] = await Promise.all([empData.getEmployeesWithMgr(removeEmployee.employee_id), empData.getEmployeeById(removeEmployee.employee_id)])

        const confirm = await promptUser([
            {
                name: "YN",
                type: "confirm",
                default: false,
                message: `\nConfirm the removal of ${employeeToRemove[0].first_name} ${employeeToRemove[0].last_name}.`
            }
        ]);
        if (confirm.YN) {
            // if yes, update the manager_id of any employees who report to this employee to null
            directReports.forEach(async (emp) => {
                try {
                    await empData.updateEmpMgr(null, emp.id)
                } catch (err) {
                    console.log(err)
                }
            })
            // remove the employee from the db
            await empData.remove("employee", removeEmployee.empId)
            console.log(`\n${employeeToRemove[0].first_name} ${employeeToRemove[0].last_name} has been removed.`)
        }


    } catch (err) {
        console.log(err)
    }
}


// remove a department
const removeDepartment = async () => {
    try {
        // get a list of departments to populate inquirer choices
        const departments = await empData.getDepartments();
        const remove = await promptUser([

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
                message: "Which department would you like to remove?"
            },

        ]);

        // search for roles in this department
        const deptRoles = await empData.getRolesByDept(remove.dept_id);
        // if this department has roles, warn the user that they will also be deleted, as well as employees with those roles
        if (deptRoles.length) {
            console.log(lineBreak1);
            console.log("WARNING: This department contains roles in use:")
            deptRoles.forEach((role) => {
                console.log(role.title)
            })
            console.log("If you remove this department, all roles and employees in this department will also be removed.")
            console.log(line)
        }
        // query to get the department name
        const removeDept = await empData.getDeptById(remove.dept_id);
        // ask the user to confirm the delete
        const confirm = await promptUser([
            {
                name: "YN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${removeDept[0].department}? This will be permanent.`
            }
        ]);
        if (confirm.YN) {
            // if yes, delete the department from the db
            await empData.remove("department", remove.dept_id)
            console.log(`\n${removeDept[0].department} department has been removed.`)

        }

    } catch (err) {
        console.log(err)
    }
}

// Delete a role
const delRole = async () => {
    try {
        // get a list of roles to populate the inquirer choices
        const roles = await empData.getRoles();
        const remove = await promptUser([

            {
                name: "roleId",
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
                message: "Which role would you like to remove?"
            },

        ]);

        // search for employees with this role
        const employeeRoles = await empData.getEmployeesByRole(remove.roleId);
        // if there are employees with this role, warn the user that deleting the role will also delete the employees
        if (employeeRoles.length) {
            console.log(line)
            console.log("WARNING: This role is assigned to active employees:")
            employeeRoles.forEach((emp) => {
                console.log(`${emp.first_name} ${emp.last_name}`)
            })
            console.log("If you remove this role, all employees assigned this role will also be removed.")
            console.log(line)
        }

        // get the name of the role to be removed
        const removeRole = await empData.getRoleById(remove.roleId);
        // ask the user to confirm the delete
        const confirm = await promptUser([
            {
                name: "YN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you want to remove ${removeRole[0].title}? This will be permanent.`
            }
        ]);
        // if yes, delete the role
        if (confirm.YN) {
            await empData.remove("role", remove.roleId)
            console.log(`\n${removeRole[0].title} role has been removed.`)

        }

    } catch (err) {
        console.log(err)
    }
}



module.exports = { removeDepartment, removeEmployee, delRole }