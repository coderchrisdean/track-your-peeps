// view employees
function viewEmployees() {
    
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
}
