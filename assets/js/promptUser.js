// Prompt the user to select an action
function promptUser() {
    inquirer.prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add Employee",
            "Add Role",
            "Add Department",
            "View Employees",
            "View Roles",
            "View Departments",
            "Update Employee Role",
            "Exit"
        ]
    }).then(function(answer) {
        switch (answer.start) {
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Exit":
                //end the connection if exit is selected
                connection.end();
                break;
        }
    });
}
