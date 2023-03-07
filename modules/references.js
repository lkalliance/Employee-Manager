

const queries = require('./queries');

const questions = {
    "View All Employees": queries.getEmployees,
    "Add Employee": queries.addEmployee,
    "Update Employee Role": null,
    "View All Roles": queries.getRoles,
    "Add Role":  queries.addRole,
    "View All Departments": queries.getDepartments,
    "Add Department": queries.addDepartment
};

module.exports = { questions };