const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const classes = require('./modules/classes');
const inq = require('./modules/inquiries');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'blah99',
        database: 'company_info_db'
    },
    console.log(`Connected to the company_info_db database.`)
);

const getEmployees = async function () {
    if (classes.employees.length == 0) {
        console.log(`\n\nThere are no employees currently recorded.\n\n`);
        startProcess();
        return;
    }
    // const employees = await db.promise().query('SELECT e.id, e.first_name as first, e.last_name as last, m.first_name as mgr_first, m.last_name as mgr_last, r.title, d.name, r.salary FROM employee e LEFT JOIN employee m ON e.manager_id=m.id JOIN role r ON e.role_id=r.id JOIN department d ON r.department_id=d.id');

    // console.table(employees[0]);

    const output = []
    for (employee of classes.employees) {
        output.push(employee.display());
    };

    console.log(`\n`);
    console.table(output);
    startProcess();
};

const getRoles = async function () {
    if (classes.roles.length == 0) {
        console.log(`\n\nThere are no roles currently recorded.\n\n`);
        startProcess();
        return;
    }
    const output = []
    for (role of classes.roles) {
        output.push(role.display());
    };

    console.log(`\n`);
    console.table(output);
    startProcess();
};

const getDepartments = async function () {
    if (classes.departments.length == 0) {
        console.log(`\n\nThere are no departments currently recorded.\n\n`);
        startProcess();
        return;
    }
    const output = []
    for (department of classes.departments) {
        output.push(department.display());
    };

    console.log(`\n`);
    console.table(output);
    startProcess();
};



const addRole = async function () {
    if (classes.departmentNames.length == 0) {
        console.log(`\n\nThere are no departments entered. Enter a department first.\n\n`);
        startProcess();
        return false;
    }
    const responses = await inquirer.prompt(
        inq.prompts.newRole
    );
    const addition = await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [responses.title, responses.salary, classes.depIds[responses.department]]);
    classes.roles.push(new classes.Role(addition[0].insertId, responses));
    startProcess();
};

const addDepartment = async function () {
    const responses = await inquirer.prompt(
        inq.prompts.newDepartment
    );
    const addition = await db.promise().query('INSERT INTO department (name) VALUES (?);', responses.name);
    classes.departments.push(new classes.Department(addition[0].insertId, responses.name));
    
    console.log(classes.departments, classes.depIds);
    startProcess();
};

const addEmployee = async function () {
    console.clear();
    if (classes.roleNames.length == 0) {
        console.log(`\n\nThere are no roles entered. Enter a role first.\n\n`);
        startProcess();
        return false;
    }
    if (classes.employeeNames.length > 0) {
        inq.prompts.newEmployee.push({
            message: "Who is the employee's manager?",
            name: "manager",
            type: "list",
            choices: [...classes.employeeNames, "none"]
        });
    }
    const responses = await inquirer.prompt(
        inq.prompts.newEmployee
    );
    const query = (responses.manager) ? 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)' : 'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)'
    const wildcards = [responses.first, responses.last, classes.roleIds[responses.role]];
    if (responses.manager) wildcards.push(classes.mgrIds[responses.manager]);
    const addition = await db.promise().query(query, wildcards);

    console.log(addition[0]);
    classes.employees.push(new classes.Employee(addition[0].insertId, responses));
    
    startProcess();
};


const questions = {
    "View All Employees": getEmployees,
    "Add Employee": addEmployee,
    "Update Employee Role": null,
    "View All Roles": getRoles,
    "Add Role":  addRole,
    "View All Departments": getDepartments,
    "Add Department": addDepartment
};


const startProcess = async function () {
    const q = await inquirer.prompt(
        inq.prompts.default
    );
    if ( q.action == "Done" ) return;
    else questions[q.action]();
}


const init = async () => {
    console.clear();
    // const initEmployees = async function () {
    //     const employees1 = await db.promise().query('SELECT * FROM employee');
    //     return employees1[0];
    // };
    
    // const initRoles = async function () {
    //     const roles = await db.promise().query('SELECT * FROM role');
    //     return roles[0];
    // };
    
    // const initDepartments = async function () {
    //     const departments = await db.promise().query('SELECT * FROM department');
    //     return departments[0];
    // };

    const departsList = await db.promise().query('SELECT * FROM department');
    departsList[0].forEach((department) => {
        classes.departments.push(new classes.Department(department.id, department.name));
    });

    const rolesList = await db.promise().query('SELECT r.id, r.title, r.salary, d.name as department FROM role r LEFT JOIN department d ON r.department_id=d.id');
    rolesList[0].forEach((role) => { 
        classes.roles.push(new classes.Role(role.id, role));
        classes.roleIds[role.title] = role.id;
    });

    const employeeList = await db.promise().query('SELECT e.first_name as first, e.last_name as last, r.title as role, m.first_name as mgr_first, m.last_name as mgr_last, r.salary as salary, d.name as department FROM employee e LEFT JOIN employee m ON e.manager_id=m.id JOIN role r ON e.role_id=r.id JOIN department d ON r.department_id=d.id');
    employeeList[0].forEach((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name})`;
        const manager = `${employee.mgr_first} ${employee.mgr_last}`
        employee.manager = manager;
        classes.employees.push(new classes.Employee(employee.id, employee));
        classes.employeeNames.push(fullName);
        classes.mgrIds[fullName] = employee.id;
    });
    if ( classes.employeeNames > 0 ) {
        inq.prompts.addEmployee.push({ message: "Who is the employee's manager?", name: "manager", type: "list", choices: classes.employeeNames });
    }

    startProcess();
}

init();

module.exports = { db };
