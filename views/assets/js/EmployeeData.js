
const connection = require("../../../config/connection");
const util = require("util");

// use promises to perform SQL queries
const query = util.promisify(connection.query).bind(connection);

// data constructor

class EmployeeData {
  constructor() {}

  // get all employees
  async viewAllEmployees() {
    const employees = await query("SELECT * FROM employee");
    return employees;
  }
  // get all roles
  async viewAllRoles() {
    const roles = await query("SELECT * FROM role");
    return roles;
  }
  // get all departments
  async viewAllDepartments() {
    const departments = await query("SELECT * FROM department");
    return departments;
  }
  // view all employees by department
  async viewEmployeesByDepartment(department_id) {
    const employees = await query("SELECT * FROM employee WHERE department_id = ?",[department_id]);
    return employees;
  }
  // view all employees by manager
  async viewAllEmployeesByManager(manager_id) {
    const employees = await query(
      "SELECT * FROM employee WHERE id = ?",
      [manager_id]
    );
    return employees;
  }
  // get all roles
  async viewRoles() {
    const roles = await query("SELECT * FROM role");
    return roles;
  }
  // get all departments
  async viewDepartments() {
    const departments = await query("SELECT * FROM department");
    return departments;
  }
  // get all managers
  async viewManagers() {
    const managers = await query(
      "SELECT * FROM employee WHERE manager_id IS NULL"
    );
    return managers;
  }
  // add an employee
  async addEmployee(employee) {
    const newEmployee = await query("INSERT INTO employee SET ?", employee);
    return newEmployee;
  }
  // add a role
  async addRole(role) {
    const newRole = await query("INSERT INTO role SET ?", role);
    return newRole;
  }
  // add a department
  async addDepartment(department) {
    const newDepartment = await query(
      "INSERT INTO department SET ?",
      department
    );
    return newDepartment;
  }
  // update an employee's role
  async updateEmployeeRole(employee_id, role_id) {
    const updatedEmployee = await query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [role_id, employee_id]
    );
    return updatedEmployee;
  }
  // update an employee's manager
  async updateEmployeeManager(employee_id, manager_id) {
    const updatedEmployee = await query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [manager_id, employee_id]
    );
    return updatedEmployee;
  }
  // remove an employee
  async removeEmployee(employee_id) {
    const removedEmployee = await query(
      "DELETE FROM employee WHERE id = ?",
      [employee_id]
    );
    return removedEmployee;
  }
  // remove a role
  async removeRole(role_id) {
    const removedRole = await query("DELETE FROM role WHERE id = ?", role_id);
    return removedRole;
  }
  //remove department
  async removeDepartment(department_id) {
    const removedDepartment = await query("DELETE FROM department WHERE id = ?",[department_id]);
    return removedDepartment;
  }

  // get the total utilized budget of a department -- ie the combined salaries of all employees in that department
  async viewDepartmentBudget(department_id) {
    const budget = await query(
      "SELECT SUM(salary) AS budget FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE department_id = ?",
      department_id
    );
    return budget;
  }
}

module.exports = EmployeeData;
