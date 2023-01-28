const connection = require('./connection.js');
const cTable = require('console.table');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

// Create a class to hold all the functions to interact with the database
class EmployeeData {
    // View all employees
    viewEmployees() {
        return query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;");
    }
    // View all employees by department
    viewEmployeesByDepartment() {
        return query("SELECT employee.id, employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY department.name;");
    }
    // View all employees by manager
    viewEmployeesByManager() {
        return query("SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY manager;");
    }
    // View all roles
    viewRoles() {
        return query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;");
    }
    // View all departments
    viewDepartments() {
        return query("SELECT department.id, department.name FROM department;");
    }
    // Add employee
    addEmployee(employee) {
        return query("INSERT INTO employee SET ?", employee);
    }
    // Add role
    addRole(role) {
        return query("INSERT INTO role SET ?", role);
    }
    // Add department
    addDepartment(department) {
        return query("INSERT INTO department SET ?", department);
    }
    // Update employee role
    updateEmployeeRole(employeeId, roleId) {
        return query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }
    // Update employee manager
    updateEmployeeManager(employeeId, managerId) {
        return query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]);
    }
    // Delete employee
    deleteEmployee(employee) {
        return query("DELETE FROM employee WHERE ?", employee);
    }
    // Delete department
    deleteDepartment(department) {
        return query("DELETE FROM department WHERE?", department);
    }
    // Delete role
    deleteRole(role) {
        return query("DELETE FROM role WHERE?", role);
    }
}
module.exports = EmployeeData;
