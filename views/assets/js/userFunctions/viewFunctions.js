const path = require("path");
const EmployeeData = require(path.join(__dirname, "../EmployeeData.js"));
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
const viewRoles = async () => {
  try {
    const roles = await employeeData.viewRoles();
    cTable.getTable(roles);
    console.table(roles);
  } catch (err) {
    console.log(err);
  }
};

// view all departments
const viewDepartments = async () => {
  try {
    const departments = await employeeData.viewDepartments();
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
    const departments = await employeeData.viewDepartments();

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

    // get list of managers to populate inquirer prompt
    const managers = await employeeData.viewManagers();

    // prompt for manager information
    const managerResponse = await promptUser([
      {
        type: "list",
        name: "manager_id",
        choices: function () {
          const choiceArray = [];
          managers.forEach((manager) => {
            const managerObject = {
              name: `${manager.first_name} ${manager.last_name}`,
              value: manager.id,
            };
            choiceArray.push(managerObject);
          });
          return choiceArray;
        },
        message: "Which manager's employees do you want to view?",
      },
    ]);

    // get employees from database
    const employees = await employeeData.viewEmployeesByDepartment(
      departmentResponse.department_id,
      managerResponse.manager_id
    );
    console.table(employees);
  } catch (err) {
    console.log(err);
  }
};

// view all employees by manager
const viewAllEmployeesByManager = async (manager_id) => {
  try {
    // get employees from database
    const employees = await employeeData.viewEmployeesByManager(manager_id);
    console.table(employees);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  viewAllEmployees,
  viewRoles,
  viewDepartments,
  viewEmployeesByDepartment,
  viewAllEmployeesByManager,
};
