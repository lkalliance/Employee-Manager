const data = require('./db_server');
const queries = require('./queries');
const db = data.db;

const managerNames = [];
const mgrConvert = {};
const departmentNames = [];
const depConvert = {};
const roleNames = [];
const roleConvert = {};

const init = async () => {
    // construct department array
    const departments = await db.promise().query('SELECT id, name FROM department');
    departments[0].forEach((department) => {
        departmentNames.push(department.name);
        depConvert[department.name] = department.id;
    });

    // construct role array
    const roles = await db.promise().query('SELECT id, title FROM role');
    roles[0].forEach((role) => {
        roleNames.push(role.title);
        roleConvert[role.title] = role.id;
    });

    // construct employee array
    const employees = await db.promise().query('SELECT e.id, e.first_name, e.last_name, r.title FROM employee e JOIN role r ON e.role_id=r.id');
    employees[0].forEach((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name} (${employee.title})`;
        managerNames.push(fullName);
        mgrConvert[fullName] = employee.id;
    });

    console.clear();
    console.log(`\n\nWelcome to the Employee Tracker. Please select an option to start.\n\n`);

    return;
}

const prompts = {
    default: 
        { 
            message: "What would you like to do?",
            name: "action",
            type: "list",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Done"]
        },
    newDepartment:
        {
            message: "What is the name of this department?", name: "name", type: "input"
        },
    newRole:
        [
            { message: "What is the name of the role?", name: "title", type: "input" },
            { message: "What is the salary of the role?", name: "salary", type: "input" },
            { message: "Which department does the role belong to?", name: "department", type: "list", choices: departmentNames }
        ],
    newEmployee:
        [
            { message: "What is the employee's first name?", name: "first", type: "input" },
            { message: "What is the employee's last name?", name: "last", type: "input" },
            { message: "What is the employee's role?", name: "role", type: "list", choices: roleNames }
        ],
    getRoles: 
        {
            message: "Which department?",
            name: "department",
            type: "list",
            choices: departmentNames
        }
}


module.exports = {
    managerNames,
    mgrConvert,
    departmentNames,
    depConvert,
    roleNames,
    roleConvert,
    prompts,
    init
};