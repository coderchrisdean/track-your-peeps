
const EmployeeData = require('./views/assets/js/EmployeeData');
const employeesData = new EmployeeData();
const inquirer = require('inquirer');
const figlet = require("figlet");
// import all functions to be used in app.js
const view = require('./views/assets/js/userFunctions/viewFunctions');
const add = require('./views/assets/js/userFunctions/addFunctions');
const update = require('./views/assets/js/userFunctions/updateFunctions');
const remove = require('./views/assets/js/userFunctions/removeFunctions');
const dropConnection = require('./views/assets/js/userFunctions/dropConnection');


// use inquirer to prompt user for input
const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

// create object to hold the action functions to send from inquirer prompt
const userFunctions = {
  // 'View Budget By Department': view.viewDepartmentBudget,
  'View All Employees': view.viewAllEmployees,
  'View All Employees By Department': view.viewEmployeesByDepartment,
  'View All Employees By Manager': view.viewAllEmployeesByManager,
  'View All Roles': view.viewRoles,
  'View All Departments': view.viewDepartments,
  'Add Employee': add.addEmployee,
  'Add Role': add.addRole,
  'Add Department': add.addDepartment,
  'Update Employee Role': update.updateEmployeeRole,
  'Update Employee Manager': update.updateEmployeeManager,
  'Remove Employee': async () => {
    try {
      // get list of employees to populate inquirer prompt
      const employees = await employeesData.viewAllEmployees();
  
      // prompt user to select employee to remove
      const removeEmployee = await inquirer.prompt([
        {
          type: "list",
          name: "id",
          message: "Which employee would you like to remove?",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ]);
  
      // delete employee from database
      await employeesData.deleteEmployee(removeEmployee.id);
  
      console.log(lineBreak1);
      console.log("Employee removed");
  
    } catch (err) {
      console.log(err);
    }
  },
  
  'Remove Role': remove.removeRole,
  'Remove Department': remove.removeDepartment,
  'Exit':() => dropConnection(connection),
};

// inquirer question - list of actions
const action = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View Budget By Department',
      'View All Employees',
      'View All Employees By Department',
      // 'View All Employees By Manager',
      'View All Roles',
      'View All Departments',
      'Add Employee',
      'Add Role',
      'Add Department',
      'Update Employee Role',
      'Update Employee Manager',
      'Remove Employee',
      'Remove Role',
      'Remove Department',
      'Exit',
    ],
    // default: 'View All Employees' // Set a default value
  },
];

const init = async () => {
  try {
    console.log('\n-----------------------------\n');
    // call viewAllEmployees function on initialization and wait for it to complete
    await view.viewAllEmployees();
    console.log('\n-----------------------------\n');

    // prompt user for the action
    const actionResponse = await promptUser(action);
    console.log('\n-----------------------------\n');
    console.log("Selected action:", actionResponse.action);
    console.log("Available actions:", Object.keys(userFunctions));
    
    await userFunctions[actionResponse.action]();
    console.log('\n-----------------------------\n');
 
    

    // call init function recursively
    init();
  } catch (err) {
    console.log(err);
  }
};




// Display welcome message
const start = async () =>
  figlet("Track Your Peeps", (err, data) => {
    if (err) {
      console.log("Unexpected error: " + err);
    }
    console.log(data);

    // start the prompts after 1 second
    setTimeout(init, 1000);
  });

start();

