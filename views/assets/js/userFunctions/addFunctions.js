const EmployeeData = require("../EmployeeData");
const employeesData = new EmployeeData();
const inquirer = require("inquirer");
const lineBreak1 = "----------------------------------";

// Add Employee Function using async/await
const addEmployee = async () => {
  try {
    // get list of roles and employees to populate inquirer prompt
    const [roles, emps] = await Promise.all([
      employeesData.viewRoles(),
      employeesData.viewAllEmployees(),
    ]);

    // prompt for employee information
    const addEmployee = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employee's manager?",
        choices: emps.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
    ]);

    // write employee information to database
    await employeesData.addEmployee(addEmployee);
    console.log(lineBreak1);
    console.log("Employee added");
    console.table(await employeesData.getEmployees());
  } catch (err) {
    console.log(err);
  }
};

// Add Role Function using async/await
const addRole = async () => {
  try {
    // get list of departments to populate inquirer prompt
    const departments = await employeesData.viewAllDepartments();

    // prompt for role information
    const addARole = await inquirer.prompt([
      { type: "input", name: "title", message: "What is the role's title?" },
      {
        type: "number",
        name: "salary",
        message: "What is the role's salary? (do not enter any special characters)",
        validate: (input) => {
          if (isNaN(input) || input < 0) {
            return "Please enter a valid positive number";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "department_id",
        message: "What is the role's department?",
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);

    // create new role
    await employeesData.addRole(addARole);
    console.log(lineBreak1);
    console.log("Role added");
    console.table(await employeesData.viewRoles());
  } catch (err) {
    console.log(err);
  }
};

const addDepartment = async () => {
  try {
    // prompt for department information
    const newDepartment = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department's name?",
      },
    ]);

    // create new department
    await employeesData.addDepartment(newDepartment);
    console.log(lineBreak1);
    console.log("Department added");
    console.table(await employeesData.viewDepartments());
  } catch (err) {
    console.log(err);
  }
};

// Export functions
module.exports = { addEmployee, addRole, addDepartment };
