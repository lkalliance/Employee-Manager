const inquirer = require('inquirer');
const db = require('../index');
const queries = require('queries');

const getEmployees = async function (department) {
    const queries = [
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary FROM employee e JOIN role r ON e.role_id=r.id JOIN department d ON r.department_id=d.id${(department >= 0) ? ` WHERE r.department=${department};` : ''};`,
        `SELECT m.first_name, m.last_name FROM employee e LEFT JOIN employee m ON e.manager_id=m.id;`
    ];
    const employees1 = await db.query(queries[0], (err, result) => {
        if (err) {
            console.log(new Error('Select operation not successful'), err);
            return false;
        } else { const results = result; }
    });
    const employees2 = await db.query(queries[1], (err, result) => {
        if (err) {
            console.log(new Error('Select operation not successful'), err);
            return false;
        } else {
            for ( employee of results ) employee.push(`${result.first_name} ${result.last_name}`);
            return results;
        }
    })
};

const getRoles = async function (department) {
    const roles = await db.query('SELECT r.title, d.name as department, r.salary FROM role r JOIN department d ON r.department_id=d.id?',
    (department>=0) ? ` WHERE d.id=${department}` : ';', (err, result) => {
        if (err) {
            console.log(new Error('Select operation not successful'), err);
            return false;
        } else return result;
    })
};

const getDepartments = async function () {
    const departments = await db.query('SELECT id, name as department FROM department;', (err, result) => {
        if (err) {
            console.log(new Error('Select operation not successful', err));
            return false;
        } else return result;
    })
};

const addEmployee = async function () {
    const responses = await inquirer.prompt(
        inquiries.addDepartment
    );
    const addition = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [responses.first, responses.last, responses.role, responses.manager], (err, result) => {
        if (err) {
            console.log(new Error('Add operation not successful', err));
            return false;
        } else return result;
    })
};

const addRole = async function () {
    const responses = await inquirer.prompt(
        inquiries.addRole
    );
    const addition = await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [responses.title, responses.salary, responses.department], (err, result) => {
        if (err) {
            console.log(new Error('Add operation not successful', err));
            return false;
        } else return result;
    })
};

const addDepartment = async function () {
    const responses = await inquirer.prompt(
        inquiries.addDepartment
    );
    const addition = await db.query('INSERT INTO department (name) VALUES (?);', responses.name , (err, result) => {
        if (err) {
            console.log(new Error('Add operation not successful', err));
            return false;
        } else return result;
    })
};


module.exports = { getEmployees, getRoles, getDepartments, addEmployee, addRole, addDeparrtment };