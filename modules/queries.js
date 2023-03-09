/* -- THIS MODULE HANDLES ALL THE DATABASE QUERIES -- */

const inquirer = require('inquirer');
const data = require('./db_server');
const reference = require('./initialize');
const db = data.db;


const getDepartments = async () => {
    // This function gets and returns all Departments

    const dataReturn = await db.promise().query('SELECT id, name as department FROM department').catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    });
    return dataReturn[0];
}

const getRoles = async () => {
    // This function gets and returns all Roles

    const dataReturn = await db.promise().query('SELECT r.id, r.title, d.name as department, r.salary FROM role r LEFT JOIN department d ON r.department_id=d.id').catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    });
    const result = dataReturn[0];
    // sort by Department, then by salary
    result.sort((a, b) => {
        return (a.department < b.department) ? -1 
                : (a.department > b.department) ? 1 
                : (b.salary - a.salary);
        }
    );
    for (role of result) {
        role.salary = convertToCurrency(role.salary);
    }
    return result;
}

const getEmployees = async () => {
    // This function gets and returns all Employees

    const dataReturn = await db.promise().query('SELECT e.id, e.first_name as first, e.last_name as last, r.title, d.name as department, r.salary, m.first_name as mfirst, m.last_name as mlast FROM employee e LEFT JOIN employee m ON e.manager_id=m.id LEFT JOIN role r ON e.role_id=r.id LEFT JOIN department d ON r.department_id=d.id').catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    });
    const result = dataReturn[0];
    // sort by last name
    result.sort((a, b) => { return (a.last < b.last) ? -1 : (a.last > b.last) ? 1 : 0 });
    // construct the data as needed for the display
    const data = [];
    for (employee of result) {
        data.push({
            id: employee.id,
            name: `${employee.first} ${employee.last}`,
            title: employee.title,
            department: employee.department,
            manager: (employee.mfirst && employee.mlast) ? `${employee.mfirst} ${employee.mlast}` : 'none',
            salary: convertToCurrency(employee.salary)
        });
    }
    return data;
}

const addDepartment = async (responses) => {
    // This function adds a Department

    const addition = await db.promise().query('INSERT INTO department (name) VALUES ( ? )', responses.name).catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    })
    // add to tracking array and converter object
    reference.departmentNames.push(responses.name);
    reference.depConvert[responses.name] = addition[0].insertId;
    return addition;
}

const addRole = async (responses) => {
    // This function adds a Role

    const addition = await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )', [ responses.title, responses.salary, reference.depConvert[responses.department]]).catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    })
    // add to tracking array and converter object
    reference.roleNames.push(responses.title);
    reference.roleConvert[responses.title] = addition[0].insertId;
    return addition;
}

const addEmployee = async (responses) => {
    // This function adds an Employee

    const mgr = (responses.manager && !(responses.manager == "No one")) ? reference.mgrConvert[responses.manager] : null;
    const addition = await db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)', [ responses.first, responses.last, reference.roleConvert[responses.role], mgr]).catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    });
    // add to tracking arrays and converter objects
    const fullName = `${responses.first} ${responses.last}`;
    const mgrName = `${fullName} (${responses.role})`;
    reference.employeeNames.push(mgrName);
    reference.empRoles[fullName] = responses.role;
    reference.managerNames.push(mgrName);
    reference.mgrConvert[mgrName] = addition[0].insertId;
    return addition;
}

const updateRole = async(responses, justName) => {
    // This function updates an employee's role

    const update = await db.promise().query('UPDATE employee SET role_id=? WHERE id=?', [reference.roleConvert[responses.role], reference.mgrConvert[responses.employee]]).catch((err) => {
        console.log(err);
        return { error: 'update failed' }
    });
    // alter tracking arrays and converter objects
    const newName = `${justName} (${responses.role})`;
    reference.empRoles[justName] = responses.role;
    reference.managerNames.splice( reference.managerNames.indexOf(responses.employee), 1, newName );
    reference.employeeNames.splice( reference.employeeNames.indexOf(responses.employee), 1, newName );
    return update;    
}

const updateManager = async(responses) => {
    // This function updates an employee's manger

    const update = await db.promise().query('UPDATE employee SET manager_id=? WHERE id=?', [reference.mgrConvert[responses.manager], reference.mgrConvert[responses.employee]]).catch((err) => {
        console.log(err);
        return { error: 'update failed' }
    });
    return update;    
}


function convertToCurrency(int) {
    // This function takes an integer and returns a formatted string
    const convert =  new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    return convert.format(int);
}


module.exports = { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateRole, updateManager }