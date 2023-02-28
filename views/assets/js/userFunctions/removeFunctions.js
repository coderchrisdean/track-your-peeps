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
// Remove Department Function using async/await
const removeDepartment = async () => {
    const employeeData = new EmployeeData();
    const departments = await employeeData.viewDepartments();
    try {
      // prompt user for department to remove
      const { department } = await inquirer.prompt([
        {
          type: "list",
          name: "department",
          message: "Which department do you want to remove?",
          choices: departments.map((department) => department.name),
        },
      ]);
      const selectedDepartment = departments.find(
        (dep) => dep.name === department
      );
      const { affectedRows } = await employeeData.removeDepartment(
        selectedDepartment.id
      );
      if (affectedRows) {
        console.log(`\n${department} department removed successfully!\n`);
      } else {
        console.log(`\nFailed to remove ${department} department.\n`);
      }
    } catch (err) {
      console.log(err);
    }
  };
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