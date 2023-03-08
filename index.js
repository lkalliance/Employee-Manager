const inquirer = require('inquirer');
const press = require('press-any-key');
const initialize = require('./modules/initialize');
const processes = require('./modules/processes');

const questions = {
    "View Employees": processes.getEmployees,
    "Add Employee": processes.addEmployee,
    "Update Employee Role": processes.updateEmployeeRole,
    "Update Employee Manager": processes.updateEmployeeManager,
    "View Roles": processes.getRoles,
    "Add Role":  processes.addRole,
    "View Departments": processes.getDepartments,
    "Add Department": processes.addDepartment
};

const startProcess = async () => {
    const q = await inquirer.prompt(
        initialize.prompts.default
    );
    console.log(q.action);
    if ( q.action == "Done" ) endProcess();
    else await questions[q.action](q);
    await press(`press any key to continue`);
    startProcess();
}

const start = async () => {
    await initialize.init();
    startProcess();
}

const endProcess = () => {
    console.log("Now exiting the application.");
    process.exit();
}

start();

