const inquirer = require('inquirer');
const initialize = require('./modules/initialize');
const processes = require('./modules/processes');

const questions = {
    "View All Employees": processes.getEmployees,
    "Add Employee": processes.addEmployee,
    "Update Employee Role": processes.updateEmployee,
    "View All Roles": processes.getRoles,
    "Add Role":  processes.addRole,
    "View All Departments": processes.getDepartments,
    "Add Department": processes.addDepartment
};

const startProcess = async () => {
    const q = await inquirer.prompt(
        initialize.prompts.default
    );
    if ( q.action == "Done" ) endProcess();
    else await questions[q.action](q);
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

