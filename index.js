const mysql = require('mysql2');
const inquiries = require('./modules/inquiries');

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

module.exports = db;