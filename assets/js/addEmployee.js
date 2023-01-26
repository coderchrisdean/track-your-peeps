    // Add Employee
function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's role ID?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the employee's manager's ID?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO employee SET ?", {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
        }, function(err) {
            if (err) throw err;
            console.log("Employee added successfully!");
            startApplication();
        });
    });
}
    
    