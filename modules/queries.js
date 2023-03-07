const inquirer = require('inquirer');
const data = require('../index');
const inquiries = require('./inquiries');



// const getEmployees = async function (department) {
//     const queries = [
//         `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary FROM employee e JOIN role r ON e.role_id=r.id JOIN department d ON r.department_id=d.id${(department >= 0) ? ` WHERE r.department=${department};` : ''};`,
//         `SELECT m.first_name, m.last_name FROM employee e LEFT JOIN employee m ON e.manager_id=m.id;`
//     ];
//     const employees1 = await data.db.query(queries[0], (err, result) => {
//         if (err) {
//             console.log(new Error('Select operation not successful'), err);
//             return false;
//         } else { const results = result; }
//     });
//     const employees2 = await data.db.query(queries[1], (err, result) => {
//         if (err) {
//             console.log(new Error('Select operation not successful'), err);
//             return false;
//         } else {
//             for ( employee of results ) employee.push(`${result.first_name} ${result.last_name}`);
//             return results;
//         }
//     })
// };

// const getRoles = async function (department) {
//     const whichDepartment = inquirer.prompt(
//         inquiries.getRoles
//     )
//     const roles = await data.db.query('SELECT r.title, d.name as department, r.salary FROM role r JOIN department d ON r.department_id=d.id?',
//     (department>=0) ? ` WHERE d.id=${department}` : ';', (err, result) => {
//         if (err) {
//             console.log(new Error('Select operation not successful'), err);
//             return false;
//         } else return result;
//     })
// };

// const getDepartments = async function () {
//     const departments = await data.db.query('SELECT id, name as department FROM department;', (err, result) => {
//         if (err) {
//             console.log(new Error('Select operation not successful', err));
//             return false;
//         } else return result;
//     })
// };



// const addRole = async function () {
//     console.log("I'm adding a role");
//     const responses = await inquirer.prompt(
//         inquiries.inquirerObjs.newRole
//     );
//     const addition = await data.db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [responses.title, responses.salary, responses.department], (err, result) => {
//         if (err) {
//             console.log(new Error('Add operation not successful', err));
//             return false;
//         }
//     });
//     const newRole = new Role(addition);
// };

// const addDepartment = async function () {
//     const responses = await inquirer.prompt(
//         inquiries.inquirerObjs.newDepartment
//     );
//     const addition = await data.db.query('INSERT INTO department (name) VALUES (?);', responses.name , (err, result) => {
//         if (err) {
//             console.log(new Error('Add operation not successful', err));
//             return false;
//         }
//     });
//     const newDepartment = new Department(addition);
// };


// module.exports = { getEmployees, getRoles, getDepartments, addEmployee, addRole, addDepartment };