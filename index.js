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
        inq.prompts.default
    );
    if ( q.action == "Done" ) return;
    else initialize.questions[q.action]();
}

const start = async () => {
    await initialize.init();
    startProcess();
}

start();

