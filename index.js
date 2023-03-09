const inquirer = require('inquirer');
const press = require('press-any-key');
const initialize = require('./modules/initialize');
const processes = require('./modules/processes');

// References to procedures to call from action selection
const questions = {
    "View Employees": processes.getEmployees,
    "Add Employee": processes.addEmployee,
    "Update Employee Role": processes.updateEmployeeRole,
    "Update Employee Manager": processes.updateEmployeeManager,
    "View Roles": processes.getRoles,
    "Add Role":  processes.addRole,
    "View Departments": processes.getDepartments,
    "Add Department": processes.addDepartment,
};

const startProcess = async () => {
    // This function calls the action selection and routes the answer
    const q = await inquirer.prompt(
        initialize.prompts.default
    );
    console.log(q.action);
    if ( q.action == "Done" ) {
        endProcess();
        return;
    }
    else await questions[q.action](q);
    await press(`\x1b[36mpress any key to continue`);
    startProcess();
}

const start = async () => {
    // This function is called once to start the app
    await initialize.init();
    startProcess();
}

const endProcess = () => {
    // This function handles the exiting of the app
    console.log("\n\nNow exiting the application.\n\n");
    setTimeout(() => { process.exit() }, 500);
}

start();

