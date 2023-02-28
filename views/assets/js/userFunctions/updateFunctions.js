const inquirer = require("inquirer");
const EmployeeData = require("../EmployeeData.js");

// Update Employee Role Function using async/await
const updateEmployeeRole = async () => {
    const employeeData = new EmployeeData();
    const [employees, roles] = await Promise.all([
      employeeData.viewAllEmployees(),
      employeeData.viewRoles(),
    ]);
    try {
      // prompt for employee and role information
      const employeeRole = await inquirer.prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role do you want to update?",
          choices: employees.map(
            (employee) =>
              `${employee.id} - ${employee.first_name} ${employee.last_name}`
          ),
        },
        {
          type: "list",
          name: "role",
          message: "What is the employee's new role?",
          choices: roles.map((role) => `${role.id} - ${role.title}`),
        },
      ]);
      const [employeeId, employeeName] = employeeRole.employee.split(" - ");
      const [roleId, roleName] = employeeRole.role.split(" - ");
      const result = await employeeData.updateEmployeeRole(
        parseInt(employeeId),
        parseInt(roleId)
      );
      console.log(`Successfully updated ${employeeName}'s role to ${roleName}`);
    } catch (err) {
      console.log(err);
    }
  };
  
// Export functions
module.exports = { updateEmployeeRole };
