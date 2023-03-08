const data = require('./db_server');
const db = data.db;

const managerNames = ["No one"];
const mgrConvert = {};
const employeeNames = [];
const empRoles = {};
const departmentNames = [];
const depConvert = {};
const roleNames = [];
const roleConvert = {};

const init = async () => {
    // construct department array and object
    const departments = await db.promise().query('SELECT id, name FROM department');
    departments[0].forEach((department) => {
        departmentNames.push(department.name);
        depConvert[department.name] = department.id;
    });

    // construct role array and object
    const roles = await db.promise().query('SELECT id, title FROM role');
    roles[0].forEach((role) => {
        roleNames.push(role.title);
        roleConvert[role.title] = role.id;
    });

    // construct employee arrays and objects
    const employees = await db.promise().query('SELECT e.id, e.first_name, e.last_name, r.title FROM employee e JOIN role r ON e.role_id=r.id');
    employees[0].forEach((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name}`;
        const mgrName = `${fullName} (${employee.title})`
        managerNames.push(mgrName);
        employeeNames.push(mgrName);
        empRoles[fullName] = employee.title;
        mgrConvert[mgrName] = employee.id;
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
            choices: ["View Employees", "View Roles", "View Departments", "Add Employee", "Update Employee Role", "Add Role", "Add Department", "Done"]
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
    updateEmployee:
        [
            { message: "Which employee needs a different role?", name: "employee", type: "list", choices: employeeNames },
            { message: "What will be the employee's new role?", name: "role", type: "list", choices: roleNames },
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
    employeeNames,
    empRoles,
    departmentNames,
    depConvert,
    roleNames,
    roleConvert,
    prompts,
    init
};