/* -- THIS MODULE SETS UP REFERENCES USED DURING THE APP -- */

const data = require('./db_server');
const db = data.db;

// Declare containers to track reference arrays and objects
const managerNames = ["No one"]; // array of managers for adding employee
const mgrConvert = {};           // manager name => id
const employeeNames = [];        // array of employees for updating manager
const empRoles = {};             // employee => id
const departmentNames = [];      // array of departments for adding role
const depConvert = {};           // department name => id
const roleNames = [];            // array of roles for adding or updating
const roleConvert = {};          // role title => id

const init = async () => {
    // put up spash screen
    setUpNewScreen();
    
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

    return;
}

// Objects to use for inquirer instances
const prompts = {
    default: 
        { 
            message: "What would you like to do?",
            name: "action",
            type: "list",
            choices: ["View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Update Employee Manager", "Done"]
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
    updateRole:
        [
            { message: "Which employee needs a different role?", name: "employee", type: "list", choices: employeeNames },
            { message: "What will be the employee's new role?", name: "role", type: "list", choices: roleNames },
        ],
    updateManager:
        [
            { message: "Which employee needs a different manager?", name: "employee", type: "list", choices: employeeNames },
            { message: "Who will be the employee's new manager?", name: "manager", type: "list", choices: employeeNames }
        ],
    ggetRoles: 
        {
            message: "Which department?",
            name: "department",
            type: "list",
            choices: departmentNames
        }
}

function setUpNewScreen() {
    // This function creates the splash screen 
    console.clear();
    console.log('\x1b[33;1m')
    console.log(' eeeee ----------------------------------------');
    console.log(' e                    l ');
    console.log(' e     m mm mm   ppp  l  ooo  y   y  eee   eee  ' );
    console.log(' eeee  m  mm  m p   p l o   o y   y e   e e   e ');
    console.log(' e     m   m  m p   p l o   o y   y eeeee eeeee ');
    console.log(' e     m   m  m p   p l o   o  y y  e     e     ');
    console.log(' eeeee m   m  m pppp  l  ooo    y    eee   eee  ');
    console.log('                p              y     ');
    console.log(' m     m        p             y      ');
    console.log(' mm   mm');
    console.log(' m m m m   aaa   n nn   aaa    ggg   eee  r rr ');
    console.log(' m  m  m  a   a  nn  n a   a  g   g e   e rr  r');
    console.log(' m     m  a   a  n   n a   a  g   g eeeee r');
    console.log(' m     m  a   a  n   n a   a  g   g e     r');
    console.log(' m     m   aaa a n   n  aaa a  gggg  eee  r');
    console.log('                                  g');
    console.log(' ------------------------------ gg ------------');
    console.log('\x1b[39;1m ');
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