const connection = require('./connection.js');
const cTable = require('console.table');
const util = require('util');
const promisfy = util.promisify(connection.query).bind(connection);

// Create a class to hold all the functions to interact with the database
class EmployeeData {
    // View all employees
    viewEmployees() {
        return promisfy("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;");
    }
    // View all employees by department
    viewEmployeesByDepartment() {
        return promisfy("SELECT employee.id, employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY department.name;");
    }
    // View all employees by manager
    viewEmployeesByManager() {
        return promisfy("SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY manager;");
    }
    // View all roles
    viewRoles() {
        return promisfy("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;");
    }
    // View all departments
    viewDepartments() {
        return promisfy("SELECT department.id, department.name FROM department;");
    }
    // Add employee
    addEmployee(employee) {
        return promisfy("INSERT INTO employee SET ?", employee);
    }
    // Add role
    addRole(role) {
        return promisfy("INSERT INTO role SET ?", role);
    }
    // Add department
    addDepartment(department) {
        return promisfy("INSERT INTO department SET ?", department);
    }
    // Update employee role
    updateEmployeeRole(employeeId, roleId) {
        return promisfy("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }
    // Update employee manager
    updateEmployeeManager(employeeId, managerId) {
        return promisfy("UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]);
    }
    // Delete employee
    deleteEmployee(employee) {
        return promisfy("DELETE FROM employee WHERE ?", employee);
    }
    // Delete department
    deleteDepartment(department) {
        return prom
        ("DELETE FROM department WHERE?", department);
    }
    // Delete role
    deleteRole(role) {
        return promisfy("DELETE FROM role WHERE?", role);
    }
}
module.exports = EmployeeData;
