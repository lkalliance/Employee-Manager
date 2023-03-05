const inquirer = require('inquirer');

const inquiries = {
    default: 
        { 
            message: "What would you like to do?",
            name: "action",
            type: "list",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
        },
    addDepartment:
        {
            message: "What is the name of this department?", name: "name", type: "input"
        },
    addRole:
        [
            { message: "What is the name of the role?", name: "title", type: "input" },
            { message: "What is the salary of the role?", name: "salary", type: "input" },
            { message: "Which department does the role belong to?", name: "department_id", type: "list", choices: departments }
        ],
    addEmployee:
        [
            { message: "What is the employee's first name?", name: "first_name", type: "input" },
            { message: "What is the employee's last name?", name: "last_name", type: "input" },
            { message: "What is the employee's role?", name: "role", type: "list", choices: roles },
            { message: "Who is the employee's manager?", name: "manager", type: "list", choices: team }
        ]
}



module.exports = inquiries;