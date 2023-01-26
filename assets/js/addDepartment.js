// add department
function addDepartment() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the department name?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO department SET ?", {
            name: answer.name
        }, function(err) {
            if (err) throw err;
            console.log("Department added successfully!");
            startApplication();
        });
    });
}
