/* -- THIS MODULE MANAGES THE PROCESSES FOR SELECTED ACTIONS -- */

const inquirer = require('inquirer');
const cTable = require('console.table')
const queries = require('./queries');
const values = require('./initialize');


/* ----- DISPLAY FUNCTIONS ----- */


const getDepartments = async () => {
    // This function displays the list of Departments

    if ( values.departmentNames.length == 0 ) {
        // there are no departments
        console.log('\n\nThere are no departments entered.\nCreate one by using \x1b[33;1mAdd Department\x1b[39;0m.\n\n');
        return;
    }
    // make the query
    const data = await queries.getDepartments();
    if (data.error) {
        console.log(data.error);
        return;
    }
    // display the results
    console.clear();
    console.log('\n\nHere are the listed \x1b[33;1mDepartments\x1b[39;0m:\n');
    console.table(data);
    return;
}

const getRoles = async () => {
    // This function displays the list of Roles

    if ( values.roleNames.length == 0 ) {
        // there are no roles
        console.log('\n\nThere are no roles entered.\nCreate one by using \x1b[33;1mAdd Role\x1b[39;0m.\n\n');
        return;
    }
    // make the query
    const data = await queries.getRoles();
    if (data.error) {
        console.log(data.error);
        return;
    }
    // display the results
    console.clear();
    console.log('\n\nHere are the listed \x1b[33;1mRoles\x1b[39;0m:\n');
    console.table(data);
    return;
}

const getEmployees = async () => {
    // This function displays the list of Employees

    if ( values.managerNames.length == 1 ) {
        // there are no employees
        console.log('\n\nThere are no employees entered.\nCreate one by using \x1b[33;1mAdd Employee\x1b[39;0m.\n\n');
        return;
    }
    // make the query
    const data = await queries.getEmployees();
    if (data.error) {
        console.log(data.error);
        return;
    }
    // display the results
    console.clear();
    console.log('\n\nHere are the listed \x1b[33;1mEmployees\x1b[39;0m:\n\n');
    console.table(data);
    return;
};


/* ----- ADD FUNCTIONS ----- */


const addDepartment = async () => {
    // This function adds a Department

    console.clear();
    console.log('\n\nAdd a \x1b[33;1mDepartment\x1b[39;0m:\n\n');
    // get user input
    const responses = await inquirer.prompt(
        values.prompts.newDepartment
    ).catch((err) => {
        console.log('\n\nThere was a problem with your entry. Please try again.\n\n');
        return;
    });
    if (values.departmentNames.indexOf(responses.name) >= 0) {
        // this department already exists
        console.log(`\n\nThe department "${responses.name}" already exists.\n\n`);
        return;
    }
    // add to the database
    await queries.addDepartment(responses);
    // tell the user it's done
    console.log(`\n\nThe department "${responses.name}" has been added to the database.`);
    console.log('\n\n');
}

const addRole = async () => {
    // This function adds a Role

    if ( values.departmentNames.length == 0 ) {
        // there are no departments
        console.log('\n\nThere are no departments entered.\nCreate one by using \x1b[33;1mAdd Department\x1b[39;0m.\n\n');
        return;
    }
    console.clear();
    console.log('\n\nAdd a \x1b[33;1mRole\x1b[39;0m:\n\n');
    // get user input
    const responses = await inquirer.prompt(
        values.prompts.newRole
    ).catch((err) => {
        console.log('\n\nThere was a problem with your entry. Please try again.\n\n');
        return;
    });
    if (values.roleNames.indexOf(responses.title) >= 0) {
        // this role already exists
        console.log(`\n\nThe department "${responses.title}" already exists.\n\n`);
        return;
    }
    // add to the database
    await queries.addRole(responses);
    // tell the user it's done
    console.log(`\n\nThe role "${responses.title}" has been added to the database.\n\n`);
}

const addEmployee = async () => {
    // This function adds an Employee

    if ( values.roleNames.length == 0 ) {
        // there are no roles
        console.log('\n\nThere are no roles entered.\nCreate one by using \x1b[33;1mAdd Role\x1b[39;0m.\n\n');
        return;
    }
    if ( values.employeeNames.length >0 ) {
        // there is at least one other employee: add manager prompt
        values.prompts.newEmployee.push(
            { message: "Who does this employee report to?", name: "manager", type: "list", choices: values.managerNames }
        )
    }
    console.clear();
    console.log(`\n\nAdd an \x1b[33;1mEmployee\x1b[39;0m:\n\n`);
    // get user input
    const responses = await inquirer.prompt(
        values.prompts.newEmployee
    ).catch((err) => {
        console.log('\n\nThere was a problem with your entry. Please try again.\n\n');
        return;
    });
    // add to the database
    await queries.addEmployee(responses);
    // tell the user it's done
    console.log(`\n\nThe employee "${responses.first} ${responses.last}" has been added to the database.\n\n`);
}


/* ----- UPDATE FUNCTIONS ----- */


const updateEmployeeRole = async () => {
    // This function update's an employee's Role

    if ( values.managerNames.length == 1 ) {
        // there are no employees to update
        console.log('\n\nThere are no employees entered.\nCreate one by using \x1b[33;1mAdd Employee\x1b[39;0m.\n\n');
        return;
    }
    if ( values.roleNames.length <= 1 ) {
        // there are not enough roles to change from one to another
        console.log('\n\nThere are not enough roles entered to change to a different one.\nCreate one by using \x1b[33;1mAdd Role\x1b[39;0m.\n\n');
        return;
    }
    console.clear();
    console.log("\n\nUpdate an employee's \x1b[33;1mRole\x1b[39;0m:\n\n");
    // get user input
    const responses = await inquirer.prompt(
        values.prompts.updateRole
    )
    const justName = responses.employee.split(' (')[0];
    // update the database
    await queries.updateRole(responses, justName);
    // tell the user it's done
    console.log(`\n\n${justName}'s role has been updated.\n\n`)
}

const updateEmployeeManager = async () => {
    // This function updates an employee's Manager

    if ( values.employeeNames.length == 1 ) {
        // there are not enough employees to make it possible
        console.log('\n\nThere are not enough employees entered to change to a new Manager.\nCreate them by using \x1b[33;1mAdd Employee\x1b[39;0m.\n\n');
        return;
    }
    console.clear();
    console.log("\n\nUpdate an employee's \x1b[33;1mManager\x1b[39;0m:\n\n");
    // get user input
    const responses = await inquirer.prompt(
        values.prompts.updateManager
    )
    if (responses.employee == responses.manager) {
        // employee selected as own manager
        console.log('\n\nYou cannot define an employee as their own Manager.\n\n');
        return;
    }
    const justName = responses.employee.split(' (')[0];
    // update the database
    await queries.updateManager(responses);
    // tell the user it's done
    console.log(`\n\n${justName}'s manager has been changed.\n\n`)
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