// linebreak for console
const lineBreak1 = "----------------------------------";

const EmployeeData = require("../EmployeeData");
const cTable = require("console.table");
const inquirer = require("./inquirer");

// inquirer to prompt user for information
const promptUser = async (questions) => {
  return await inquirer.prompt(questions);
};

// Create new EmployeeData object
const employees = new EmployeeData();

// Add Employee Function using async/await
const addEmployee = async () => {
  try {
    // get list of roles and employees to populate inquirer prompt
    const [roles, employees] = await Promise.all([
      employees.getRoles(),
      employees.getEmployees(),
    ]);

    // prompt for employee information
    const addEmployee = await promptUser([
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
        name: "role",
        message: "What is the employee's role?",
        choices: function () {
          // create array of role titles
          const roleArray = [];
          roles.forEach(({ title }) => {
            roleArray.push(title);
          });
          return roleArray;
        },
        message: "Choose the employee's role?",
      },

      { type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: function() {
          // create array of manager names
          const managerArray = [];
          employees.forEach(({ first_name, last_name }) => {
          managerArray.push(`${first_name} ${last_name}`);
          });
          return managerArray;
      } },
    ]);

    // write employee information to database
    await employees.addEmployee(addEmployee);
    console.log(lineBreak1);
    console.log("Employee added");
    cTable(employees);
  } catch (err) {
    console.log(err);
  }
};

// Update Employee Function using async/await

// Add Role Function using async/await
const addRole = async () => {
  try {
    // get list of departments to populate inquirer prompt
    const departments = await EmployeeData.viewDepartments();

    // prompt for role information
    const addRole = await promptUser([
      { type: "input", name: "title", message: "What is the role's title?" },
      { type: "input", name: "salary", message: "What is the role's salary?" },
      {
        type: "list",
        name: "department_id",
        message: "What is the role's department?",
        choices: departments,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

// Add Department Function using async/await
const addDepartment = async () => {
  try {
    // prompt for department information
    const newDepartment = await promptUser([
      {
        type: "input",
        name: "department",
        message: "What is the department's name?",
      },
    ]);
    //create new department
    await employees.addDepartment(newDepartment);
    console.log(lineBreak1);
    console.log("Department added");
    cTable(employees);
  } catch (err) {
    console.log(err);
  }
};

// Export functions
module.exports = {
  addEmployee,
  addRole,
  addDepartment,
}
