const inquirer = require('inquirer');
const data = require('./db_server');
const reference = require('./initialize');
const db = data.db;


const getDepartments = async () => {
    const dataReturn = await db.promise().query('SELECT id, name as department FROM department').catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    });
    return dataReturn[0];
}

const getRoles = async () => {
    const dataReturn = await db.promise().query('SELECT r.id, r.title, d.name as department, r.salary FROM role r LEFT JOIN department d ON r.department_id=d.id').catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    });

    const result = dataReturn[0];
    for (role in data) {
        role.salary = convertToCurrency(role.salary);
    }
    return result;
}

const getEmployees = async () => {
    const dataReturn = await db.promise().query('SELECT e.id, e.first_name as first, e.last_name as last, r.title, d.name as department, r.salary, m.first_name as mfirst, m.last_name as mlast FROM employee e LEFT JOIN employee m ON e.manager_id=m.id LEFT JOIN role r ON e.role_id=r.id LEFT JOIN department d ON r.department_id=d.id').catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    });

    const result = dataReturn[0];
    const data = [];
    for (employee in result) {
        data.push({
            id: employee.id,
            name: `${employee.first} ${employee.last}`,
            title: employee.title,
            department: employee.department,
            manager: `${employee.mfirst} ${employee.mlast}`,
            salary: convertToCurrency(employee.salary)
        });
    }
    return data;
}

const addDepartment = async (responses) => {
    const addition = await db.promise().query('INSERT INTO department (name) VALUES ( ? )', responses.name).catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    })

    reference.departmentNames.push(responses.name);
    reference.depConvert[responses.name] = responses.id;
    console.log(addition);
    return;
}

const addRole = async (responses) => {
    const addition = await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )', [ responses.title, responses.salary, reference.depConvert[responses.department]]).catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    })

    reference.roleNames.push(responses.title);
    reference.roleConvert[responses.title] = responses.id;
    console.log(addition);
    return;
}

const addEmployee = async (responses) => {
    const mgr = responses.manager ? reference.mgrConvert[responses.manager] : null;
    const addition = await db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)', [ respones.first, responses.last, reference.roleConvert[responses.role], mgr]).catch((err) => {
        console.log(err);
        return { error: 'query failed' }
    });

    if (mgr) {
        reference.managerNames.push(responses.manager);
        reference.mgrConvert[response.manager] = response.id;
    }
    console.log(addition);
    return;
}


function convertToCurrency(int) {
    const convert =  new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    return convert.format(int);
}


module.exports = { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee }

