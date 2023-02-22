// remove functions

// Delete Employee Function using async/await
const deleteEmployee = async () => {
    try {
        // get list of employees to populate inquirer prompt
        const employees = await EmployeeData.viewEmployees();
    
        // prompt for employee information
        const deleteEmployee = await promptUser([
        {
            type: "list",
            name: "employee",
            message: "Which employee do you want to delete?",
            choices: employees,
        },
        ]);
    
        // delete employee from database
        await employees.deleteEmployee(deleteEmployee);
        console.log(lineBreak1);
        console.log("Employee deleted");
        cTable(employees);
    } catch (err) {
        console.log(err);
    }
    };
// Delete Department Function using async/await
const deleteDepartment = async () => {

    try {
        // get list of departments to populate inquirer prompt
        const departments = await EmployeeData.viewDepartments();
    
        // prompt for department information
        const deleteDepartment = await promptUser([
        {
            type: "list",
            name: "department",
            message: "Which department do you want to delete?",
            choices: departments,
        },
        ]);
    
        // delete department from database
        await employees.deleteDepartment(deleteDepartment);
        console.log(lineBreak1);
        console.log("Department deleted");
        cTable(employees);
    } catch (err) {
        console.log(err);
    }
    }
// Delete Role Function using async/await
const deleteRole = async () => {
    try {
        // get list of roles to populate inquirer prompt
        const roles = await EmployeeData.viewRoles();
    
        // prompt for role information
        const deleteRole = await promptUser([
        {
            type: "list",
            name: "role",
            message: "Which role do you want to delete?",
            choices: roles,
        },
        ]);
    
        // delete role from database
        await employees.deleteRole(deleteRole);
        console.log(lineBreak1);
        console.log("Role deleted");
        cTable(employees);
    } catch (err) {
        console.log(err);
    }
    }
// Export functions
module.exports = {
    deleteEmployee,
    deleteDepartment,
    deleteRole,
    };