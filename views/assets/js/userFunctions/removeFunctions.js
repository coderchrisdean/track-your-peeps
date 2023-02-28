const EmployeeData = require("../EmployeeData.js");
const employeesData = new EmployeeData();
const inquirer = require("inquirer");
const lineBreak1 = "----------------------------------------";
// use inquirer to prompt user for input
const promptUser = (questions) => {
    return inquirer.prompt(questions);
  };

// remove functions

// Delete Employee Function using async/await
const removeEmployee = async () => {
    try {
        // get list of employees to populate inquirer prompt
        const employees = await employeesData.viewEmployees();
    
        // prompt for employee information
        const removeEmployee = await promptUser([
        {
            type: "list",
            name: "employee",
            message: "Which employee do you want to remove?",
            choices: employees,
        },
        ]);
    
        // remove employee from database
        await employeesData.removeEmployee(removeEmployee.employee_id);
        console.log(lineBreak1);
        console.log("Employee removed");
        console.table(employees);
    } catch (err) {
        console.log(err);
    }
    };
// remove Department Function using async/await
const removeDepartment = async () => {

    try {
        // get list of departments to populate inquirer prompt
        const departments = await employeesData.viewDepartments();
    
        // prompt for department information
        const removeDepartment = await promptUser([
        {
            type: "list",
            name: "department",
            message: "Which department do you want to remove?",
            choices: departments,
        },
        ]);
    
        // remove department from database
        await employeesData.removeDepartment(removeDepartment.department_id);
        console.log(lineBreak1);
        console.log("Department removed");
        console.table(employees);
    } catch (err) {
        console.log(err);
    }
    }
// remove Role Function using async/await
const removeRole = async () => {
    try {
        // get list of roles to populate inquirer prompt
        const roles = await employeesData.viewRoles();

        // prompt for role information
        const removeRole = await promptUser([
            {
                type: "list",
                name: "role",
                message: "Which role do you want to remove?",
                choices: roles.map((role) => role.title),
            },
        ]);

        // get the id of the selected role
        const roleId = roles.find((role) => role.title === removeRole.role).id;

        // remove role from database
        await employeesData.removeRole(roleId);
        console.log(lineBreak1);
        console.log("Role removed");
        console.table(await employeesData.viewRoles());
    } catch (err) {
        console.log(err);
    }
};

// Export functions
module.exports = {
    removeEmployee,
    removeDepartment,
    removeRole,
    };