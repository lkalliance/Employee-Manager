const queries = require('./queries');

const employees = [];
const employeeNames = [];
const roles = [];
const roleNames = [];
const departments = [];
const departmentNames = [];

class Employee {
    constructor(employee) {
        this.id = employee.id;
        this.fname = employee.first;
        this.lname = employee.last;
        this.role = employee.role;
        this.manager = employee.manager;
        employees.push(this);
        employeeNames.push(`${this.getName()} (${this.role})`);
    }

    getName() {
        return `${this.fname} ${this.lname}`;
    }

    getManager() {
        if (!this.manager) return false;
        return this.manager;
    }
}

class Role {
    constructor(role) {
        this.id = role.id;
        this.title = role.title;
        this.salary = role.salary;
        this.department = role.department;
        roles.push(this);
        roleNames.push(this.title);
    }

    getTitle() {
        return this.title;
    }

    getSalary() {
        return `$${this.salary}`;
    }

    getDepartment() {
        return this.department;
    }
}

class Department {
    constructor(department) {
        this.id = department.id;
        this.name = department.name;
        departments.push(this);
        departmentNames.push(this.name);
    }
}


module.exports = { Employee, Role, Department, employees, roles, departments, employeeNames, roleNames, departmentNames }