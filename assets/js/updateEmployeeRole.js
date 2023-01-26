// update employee role
function updateEmployeeRole() {

    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the employee's ID?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's new role ID?"
        }
    ]).then(function(answer) {
        connection.query("UPDATE employee SET ? WHERE ?", [
            {
                role_id: answer.role_id
            },
            {
                id: answer.id
            }
        ], function(err) {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            startApplication();
        });
    });

}