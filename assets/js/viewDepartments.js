// view departments

function viewDepartments() {

    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
}
