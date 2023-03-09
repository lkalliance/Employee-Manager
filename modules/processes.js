const inquirer = require('inquirer');
const cTable = require('console.table')
const queries = require('./queries');
const values = require('./initialize');

const getDepartments = async () => {
    if ( values.departmentNames.length == 0 ) {
        console.log('\n\nThere are no departments entered.\nCreate one by using \x1b[33;1mAdd Department\x1b[39;0m.\n\n');
        return;
    }
    const data = await queries.getDepartments();
    if (data.error) {
        console.log(data.error);
        return;
    }
    console.clear();
    console.log('\n\nHere are the listed \x1b[33;1mDepartments\x1b[39;0m:\n');
    console.table(data);
    return;
}

const getRoles = async () => {
    if ( values.roleNames.length == 0 ) {
        console.log('\n\nThere are no roles entered.\nCreate one by using \x1b[33;1mAdd Role\x1b[39;0m.\n\n');
        return;
    }
     
    const data = await queries.getRoles();
    if (data.error) {
        console.log(data.error);
        return;
    }
    console.clear();
    console.log('\n\nHere are the listed \x1b[33;1mRoles\x1b[39;0m:\n');
    console.table(data);
    return;
}

const getEmployees = async () => {
    if ( values.managerNames.length == 1 ) {
        console.log('\n\nThere are no employees entered.\nCreate one by using \x1b[33;1mAdd Employee\x1b[39;0m.\n\n');
        return;
    }
    const data = await queries.getEmployees();
    if (data.error) {
        console.log(data.error);
        return;
    }
    console.clear();
    console.log('\n\nHere are the listed \x1b[33;1mEmployees\x1b[39;0m:\n\n');
    console.table(data);
    return;
};



const updateEmployeeRole = async () => {
    if ( values.managerNames.length == 1 ) {
        console.log('\n\nThere are no employees entered.\nCreate one by using \x1b[33;1mAdd Employee\x1b[39;0m.\n\n');
        return;
    }
    if ( values.roleNames.length == 0 ) {
        console.log('\n\nThere are no roles entered.\nCreate one by using \x1b[33;1mAdd Role\x1b[39;0m.\n\n');
        return;
    }
    console.clear();
    console.log("\n\nUpdate an employee's \x1b[33;1mRole\x1b[39;0m:\n\n");
    const responses = await inquirer.prompt(
        values.prompts.updateRole
    )

    const justName = responses.employee.split(' (')[0];
    await queries.updateRole(responses, justName);

    console.log(`\n\n${justName}'s role has been updated.\n\n`)
}


const updateEmployeeManager = async () => {
    if ( values.employeeNames.length == 1 ) {
        console.log('\n\nThere are not enough employees entered.\nCreate them by using \x1b[33;1mAdd Employee\x1b[39;0m.\n\n');
        return;
    }
    console.clear();
    console.log("\n\nUpdate an employee's \x1b[33;1mManager\x1b[39;0m:\n\n");
    const responses = await inquirer.prompt(
        values.prompts.updateManager
    )

    const justName = responses.employee.split(' (')[0];
    await queries.updateManager(responses);

    console.log(`\n\n${justName}'s manager has been changed.\n\n`)
}


const addDepartment = async () => {
    console.clear();
    console.log('\n\nAdd a \x1b[33;1mDepartment\x1b[39;0m:\n\n');
    const responses = await inquirer.prompt(
        values.prompts.newDepartment
    ).catch((err) => {
        console.log('\n\nThere was a problem with your entry. Please try again.\n\n');
        return;
    });

    await queries.addDepartment(responses);

    console.log(`\n\nThe department "${responses.name}" has been added to the database.`);
    console.log('\n\n');
}

const addRole = async () => {
    if ( values.departmentNames.length == 0 ) {
        console.log('\n\nThere are no departments entered.\nCreate one by using \x1b[33;1mAdd Department\x1b[39;0m.\n\n');
        return;
    }
    console.clear();
    console.log('\n\nAdd a \x1b[33;1mRole\x1b[39;0m:\n\n');
    const responses = await inquirer.prompt(
        values.prompts.newRole
    ).catch((err) => {
        console.log('\n\nThere was a problem with your entry. Please try again.\n\n');
        return;
    });

    await queries.addRole(responses);
    console.log(`\n\nThe role "${responses.title}" has been added to the database.\n\n`);
}

const addEmployee = async () => {
    if ( values.roleNames.length == 0 ) {
        console.log('\n\nThere are no roles entered.\nCreate one by using \x1b[33;1mAdd Role\x1b[39;0m.\n\n');
        return;
    }
    if ( values.employeeNames.length >0 ) {
        values.prompts.newEmployee.push(
            { message: "Who does this employee report to?", name: "manager", type: "list", choices: values.managerNames }
        )
    }
    console.clear();
    console.log(`\n\nAdd an \x1b[33;1mEmployee\x1b[39;0m:\n\n`);
    
    const responses = await inquirer.prompt(
        values.prompts.newEmployee
    ).catch((err) => {
        console.log('\n\nThere was a problem with your entry. Please try again.\n\n');
        return;
    });

    await queries.addEmployee(responses);
    console.log(`\n\nThe employee "${responses.first} ${responses.last}" has been added to the database.\n\n`);
}






module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    updateEmployeeRole,
    updateEmployeeManager,
    addDepartment,
    addRole,
    addEmployee
}