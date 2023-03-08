const inquirer = require('inquirer');
const cTable = require('console.table')
const queries = require('./queries');
const values = require('./initialize');

const getDepartments = async () => {
    if ( values.departmentNames.length == 0 ) {
        console.log(`\n\nThere are no departments entered.\nCreate one by using "Add Department".\n\n`);
        return;
    }
    const data = await queries.getDepartments();
    if (data.error) {
        console.log(data.error);
        return;
    }
    console.clear();
    console.log(`\n\nHere are the listed departments:\n`);
    console.table(data);
    console.log(`\n\n`);
    return;
}

const getRoles = async () => {
    if ( values.roleNames.length == 0 ) {
        console.log(`\n\nThere are no roles entered.\nCreate one by using "Add Role".\n\n`);
        return;
    }
     
    const data = await queries.getRoles();
    if (data.error) {
        console.log(data.error);
        return;
    }
    console.clear();
    console.log(`\n\nHere are the listed roles:\n`);
    console.table(data);
    console.log(`\n\n`);
    return;
}

const getEmployees = async () => {
    if ( values.managerNames.length == 1 ) {
        console.log(`\n\nThere are no employees entered.\nCreate one by using "Add Employee".\n\n`);
        return;
    }
    const data = await queries.getEmployees();
    if (data.error) {
        console.log(data.error);
        return;
    }
    console.clear();
    console.log(`\n\nHere are the listed employees:\n\n`);
    console.table(data);
    console.log(`\n\n`);
    return;
};



const updateEmployeeRole = async () => {
    if ( values.managerNames.length == 1 ) {
        console.log(`\n\nThere are no employees entered.\nCreate one by using "Add Employee".\n\n`);
        return;
    }
    if ( values.roleNames.length == 0 ) {
        console.log(`\n\nThere are no roles entered.\nCreate one by using "Add Role".\n\n`);
        return;
    }
    const responses = await inquirer.prompt(
        values.prompts.updateEmployee
    )

    const justName = responses.employee.split(' (')[0];
    await queries.updateRole(responses, justName);

    console.clear();
    console.log(`\n\nThe employee "${justName}" has been been updated.\n\n`)
    console.log(`\n\n`);

}


const addDepartment = async () => {
    const responses = await inquirer.prompt(
        values.prompts.newDepartment
    ).catch((err) => {
        console.log(`\n\nThere was a problem with your entry. Please try again.\n\n`);
        return;
    });

    await queries.addDepartment(responses);

    console.clear();
    console.log(`\n\nThe department "${responses.name}" has been added to the database.\n\n`);
    console.log(`\n\n`);
}

const addRole = async () => {
    if ( values.departmentNames.length == 0 ) {
        console.log(`\n\nThere are no departments entered.\nCreate one by using "Add Department".\n\n`);
        return;
    }
    const responses = await inquirer.prompt(
        values.prompts.newRole
    ).catch((err) => {
        console.log(`\n\nThere was a problem with your entry. Please try again.\n\n`);
        return;
    });

    await queries.addRole(responses);
    console.clear();
    console.log(`\n\nThe role "${responses.title}" has been added to the database.\n\n`);
    console.log(`\n\n`);
}

const addEmployee = async () => {
    if ( values.roleNames.length == 0 ) {
        console.log(`\n\nThere are no roles entered.\nCreate one by using "Add Role".\n\n`);
        return;
    }
    if ( values.employeeNames.length >0 ) {
        values.prompts.newEmployee.push(
            { message: "Who does this employee report to?", name: "manager", type: "list", choices: values.managerNames }
        )
    }
    const responses = await inquirer.prompt(
        values.prompts.newEmployee
    ).catch((err) => {
        console.log(`\n\nThere was a problem with your entry. Please try again.\n\n`);
        return;
    });

    await queries.addEmployee(responses);
    console.clear();
    console.log(`\n\nThe employee "${responses.first} ${responses.last}" has been added to the database.\n\n`);
    console.log(`\n\n`);
}





module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    updateEmployeeRole,
    addDepartment,
    addRole,
    addEmployee
}