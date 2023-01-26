// Add Role
function addRole() {

    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the department ID for this role?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id
        }, function(err) {
            if (err) throw err;
            console.log("Role added successfully!");
            startApplication();
        });
    });
}
