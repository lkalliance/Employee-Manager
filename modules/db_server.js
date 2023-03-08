const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'blah99',
        database: 'company_info_db'
    },
    console.log(`Connected to the company_info_db database.`)
);


module.exports = { db };