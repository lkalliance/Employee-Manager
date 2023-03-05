const queries = require('./queries');

const employees = [];
const employeeIds = [];
const roles = [];
const roleIds = [];
const departments = [];
const departmentIds = [];

class Employee {
    constructor() {
        const result = queries.addEmployee();
        this.id = result.id;
        this.name = `${this.result.first} ${this.result.last}`;
        this.role = roles.indexOf(result.role);
        this.manager = employees.indexOf(result.manager);
        employees.push(this.name);
        employeeIds.push(this.id);
    }
}

class Role {
    constructor() {
        const result = queries.addRole();
        this.id = result.id;
        this.title = result.title;
        this.salary = result.salary;
        this.department = departments.indexOf(result.department);
        roles.push(this.title);
        roleIds.push(this.id);
    }
}

class Department {
    constructor() {
        const result = queries.addDepartment();
        this.id = result.id;
        this.name = result.name;
        departments.push(this.name);
        departmentIds.push(this.id);
    }
}


module.exports = { Employee, Role, Department, employees, roles, departments, employeeIds, roleIds, departmentIds }