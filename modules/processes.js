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
    console.log(`\nHere are the listed departments:\n\n`);
    console.table(data);
    return;
}

const getRoles = async () => {
    if ( values.roleNames.length == 0 ) {
        console.log(`\n\nThere are no roles entered.\nCreate one by using "Add Role".\n\n`);
        return;
    }
    const whichDep = await inquirer.prompt(
        values.prompts.getRoles
    ).catch((err) => {
        console.log(`\n\nThere was a problem with your entry. Please try again.\n\n`);
        return;
    })
    
    const data = await queries.getRoles(whichDep.department);
    if (data.error) {
        console.log(data.error);
        return;
    }
    console.log(`\nHere are the listed roles in ${whichDep.department}:\n`);
    console.table(data);
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
    console.log(`\nHere are the listed employees:\n\n`);
    console.table(data);
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

    console.log(`The employee "${justName}" has been been updated.`)

}


const addDepartment = async () => {
    const responses = await inquirer.prompt(
        values.prompts.newDepartment
    ).catch((err) => {
        console.log(`\n\nThere was a problem with your entry. Please try again.\n\n`);
        return;
    });

    await queries.addDepartment(responses);

    console.log(`The department "${responses.name}" has been added to the database.`)
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
    console.log(`The role "${responses.title}" has been added to the database.`)

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
    console.log(`The employee "${responses.first} ${responses.last}" has been added to the database.`)

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