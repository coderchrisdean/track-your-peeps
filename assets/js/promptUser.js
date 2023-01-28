// package requirements
const inquirer = require("inquirer");

// prompt user for input using async/await
const promptUser = async (questions) => {
  return await inquirer.prompt(questions);
};

// main menu prompt

const mainMenu = async () => {
  try {
    const { choice } = await promptUser([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Exit",
        ],
      },
    ]);
    switch (choice) {
      case "View All Employees":
        viewEmployees();
        break;
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "Exit":
        process.exit();
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

// export functions
module.exports = mainMenu;
