const mysql = require('mysql2');
const inquirer = require('inquirer');
const inquiries = require('./modules/inquiries');
const queries = require('./modules/queries');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'company_info_db'
    },
    console.log(`Connected to the company_info_db database.`)
);

init();

const init = () => {
    // init goes here
    startProcess()
}

const startProcess = async function () {
    const q = await inquirer.prompt(
        inquiries.default
    );
    if ( q == "Done" ) return;
    inquiries.questions[q];    
}

module.exports = db;