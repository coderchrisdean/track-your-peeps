
const connection = require("./connect");
const cTable = require('console.table');
const util = require('util');


// use promises to perform SQL queries
const query = util.promisify(connection.query).bind(connection);


        
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApplication();
    });

// SQL data constructor

class EmployeeData {
    constructor(query) {

        this.query = query;
    }
    viewEmployees() {
        query(this.query, function(err, res) {
            if (err) throw err;
            cTable(res);
        });
    }

    viewEmployeeById(id) {
        query("SELECT * FROM employee WHERE id =?", id, function(err, res) {
            if (err) throw err;
            cTable(res);
        });
    }

    viewEmployeesByRole(role_id) {
        query("SELECT * FROM employee WHERE role_id =?", role_id, function(err, res) {
            if (err) throw err;
            cTable(res);
        });
    }
    viewRoles() {

        query("SELECT * FROM role", function(err, res) {
            if (err) throw err;
            cTable(res);
        });
    }
    viewRolesByDepartment(id) {
        query("SELECT * FROM role WHERE department_id =?", id, function(err, res) {
            if (err) throw err;
            cTable(res);
        });
    }
    viewRoleById(id) {
        query("SELECT * FROM role WHERE id =?", id, function(err, res) {
            if (err) throw err;
            cTable(res);
        });
    }
    viewDepartments() {
        query("SELECT * FROM department", function(err, res) {
            if (err) throw err;
            cTable(res);
        });
    }
    viewDepartmentById(id) {
        query("SELECT * FROM department WHERE id =?", id, function(err, res) {
            if (err) throw err;
            cTable(res);
        });
    }
    addEmployee(employee) {
        query("INSERT INTO employee SET?", employee, function(err, res) {
            if (err) throw err;
            cTable(res);
            startApplication();
        });
    }
    addRole(role) {
        query("INSERT INTO role SET?", role, function(err, res) {
            if (err) throw err;
            cTable(res);
            startApplication();
        });
    }
    addDepartment(department) {
        query("INSERT INTO department SET?", department, function(err, res) {
            if (err) throw err;
            cTable(res);
            startApplication();
        });
    }
    updateEmployeeRole(id, role_id) {
        query("UPDATE employee SET role_id =? WHERE id =?", [role_id, id], function(err, res) {
            if (err) throw err;
            cTable(res);
            startApplication();
        });
    }
    remove(table, id) {
        query("DELETE FROM ?? WHERE id =?", [table, id]), function(err, res) {
            if (err) throw err;
            cTable(res);
        };
    }
}


    module.exports = EmployeeData;

