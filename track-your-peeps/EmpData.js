const connection = require('./connect.js');
const util = require('util');

// Use promises with MySQL Queries
const query = util.promisify(connection.query).bind(connection);


// Class containing all SQL queries
class EmpData {
    constructor(query) {
        this.query = query;
    }

    getEmployees() {
        return query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) manager_name FROM ((employee LEFT JOIN employee manager ON manager.id = employee.manager_id) INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) ORDER BY employee.id');
    }

    getEmployeeById(id) {
        return query('SELECT * from employee WHERE id = ?', [id]);
    }

    getEmployeesByDept(department_id) {
        return query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) manager_name FROM ((employee LEFT JOIN employee manager ON manager.id = employee.manager_id) INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) WHERE department.id = ? ORDER BY employee.id', [department_id]);
    }

    getEmployeesByMgr(manager_id) {
        return query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) manager_name FROM ((employee LEFT JOIN employee manager ON manager.id = employee.manager_id) INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) WHERE employee.manager_id = ? ORDER BY employee.id', [manager_id]);
    }

    getEmployeesByRole(role) {
        return query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) manager_name FROM ((employee LEFT JOIN employee manager ON manager.id = employee.manager_id) INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) WHERE role.id = ? ORDER BY employee.id', [role]);
    }

    getEmployeesWithMgr(manager_id) {
        return query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee WHERE employee.manager_id = ? ORDER BY employee.id', [manager_id]);
    }

    getRoles() {
        return query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id');
    }

    getRolesByDept(department_id) {
        return query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id WHERE department.id = ?', [department_id]);
    }

    getRoleById(role_id) {
        return query('SELECT role.id, role.title, role.salary FROM role WHERE role.id = ?', [role_id]);
    }

    getDepartments() {
        return query('SELECT department.id, department.name AS department FROM department');
    }

    getDeptById(department_id) {
        return query('SELECT department.id, department.name AS department FROM department WHERE department.id = ?', [department_id]);
    }

    getBudgetByDept(department_id) {
        return query('SELECT department.name AS department, SUM(role.salary) AS Total_Department_Budget FROM (employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id) WHERE department.id = ? GROUP BY department', [department_id]);
    }

    addEmployee(employee) {
        if (employee.employeeManager === -1) {
            return query('INSERT INTO employee SET ?', { first_name: employee.employeeManager, last_name: employee.employeeManager, role_id: employee.employeeRole });
        } else {
            return query('INSERT INTO employee SET ?', { first_name: employee.employeeManager, last_name: employee.employeeManager, role_id: employee.employeeRole, manager_id: employee.employeeManager});
        }

    }

    addDepartment(dept) {
        return query('INSERT INTO department SET ?', { name: dept.departmentName });
    }

    addRole(role) {
        return query('INSERT INTO role SET ?', { title: role.roleTitle, salary: role.roleSalary, department_id: role.roleDept });
    }

    updateEmployeeRole(role, employee_id) {
        return query('UPDATE employee SET ? WHERE ?', [
            {
                role_id: role
            },
            {
                id: employee_id
            }
        ]);
    }

    updateEmployeeMgr(manager_id, employee_id) {
        return query('UPDATE employee SET ? WHERE ?', [
            {
                manager_id: manager_id
            },
            {
                id: employee_id
            }
        ]);
    }
    removeEmployee(employee_id) {
        return query('DELETE FROM employee WHERE id =?', [employee_id]);
    }
    removeDepartment(department_id) {
        return query('DELETE FROM department WHERE id =?', [department_id]);
    }
    addEmployee(employee) {
        return query('INSERT INTO employee SET ?', employee);
    }




    remove(table, id) {
        return query('DELETE FROM ?? WHERE id = ?', [table, id]);
    }

}


module.exports = EmpData;