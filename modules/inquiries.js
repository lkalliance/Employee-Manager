const queries = require('./queries');
const classes = require('./classes');
const questions = {
    "View All Employees": queries.getEmployees,
    "Add Employee": queries.addEmployee,
    "Update Employee Role": null,
    "View All Roles": queries.getRoles,
    "Add Role":  queries.addRole,
    "View All Departments": queries.getDepartments,
    "Add Department": queries.addDepartment
};

const inquiries = {
    default: 
        { 
            message: "What would you like to do?",
            name: "action",
            type: "list",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Done"]
        },
    addDepartment:
        {
            message: "What is the name of this department?", name: "name", type: "input"
        },
    addRole:
        [
            { message: "What is the name of the role?", name: "title", type: "input" },
            { message: "What is the salary of the role?", name: "salary", type: "input" },
            { message: "Which department does the role belong to?", name: "department", type: "list", choices: classes.departmentNames }
        ],
    addEmployee:
        [
            { message: "What is the employee's first name?", name: "first", type: "input" },
            { message: "What is the employee's last name?", name: "last", type: "input" },
            { message: "What is the employee's role?", name: "role", type: "list", choices: classes.departmentNames },
            { message: "Who is the employee's manager?", name: "manager", type: "list", choices: classes.employeeNames }
        ],
    getRole: 
        {
            message: "Which department?",
            name: "department",
            type: "list",
            choices: classes.roleNames
        }
}



module.exports = { inquiries, questions };