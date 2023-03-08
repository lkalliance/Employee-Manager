const inquirer = require('inquirer');
const cTable = require('console.table')
const queries = require('./queries');
const values = require('./initialize');

const getDepartments = async () => {
    const data = queries.getDepartments;

}

const getRoles = async () => {

}

const getEmployees = async () => {

}

const updateEmployee = async () => {

}

const addDepartment = async () => {

}

const addRole = async () => {

}

const addEmployee = async () => {

}



module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    updateEmployee,
    addDepartment,
    addRole,
    addEmployee
}