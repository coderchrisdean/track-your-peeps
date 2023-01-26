
// view roles
function viewRoles() {
        
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
}
