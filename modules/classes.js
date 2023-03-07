const employees = [];
const employeeNames = [];
const roles = [];
const roleNames = [];
const departments = [];
const departmentNames = [];
const depIds = {};
const roleIds = {};
const mgrIds = {};

class Employee {
    constructor(id, responses) {
        this.id = id;
        this.fname = responses.first;
        this.lname = responses.last;
        this.fullName = `${responses.first} ${responses.last}`;
        this.asManager = `${responses.first} ${responses.last} (${responses.role})`
        this.roleId = roleIds[responses.role];
        this.role = responses.role;
        this.mgrId = responses.manager ? mgrIds[responses.manager] : null;
        this.salary = responses.salary;
        this.department = responses.department;
        if (responses.manager) this.manager = responses.manager.split(" (")[0];

        employeeNames.push(this.asManager);
        mgrIds[this.asManager] = this.id;
    }

    display() {
        return {
            id: this.id,
            name: `${this.fname} ${this.lname}`,
            title: this.role,
            salary: this.salary,
            manager: this.manager,
            department: this.department
        }
    }
}

class Role {
    constructor(id, responses) {
        this.id = id;
        this.title = responses.title;
        this.salary = responses.salary;
        this.depId = depIds[responses.department];
        this.department = responses.department;
        roleNames.push(responses.title);
        roleIds[this.title] = id;
    }

    display() {
        return {
            id: this.id,
            title: this.title,
            department: this.department,
            salary: this.salary
        }
    }
}

class Department {
    constructor(id, department) {
        this.id = id;
        this.name = department;
        departmentNames.push(department);
        depIds[department] = id;
    }

    display() {
        return {
            id: this.id,
            name: this.name
        }
    }
}


module.exports = { Employee, Role, Department, employees, employeeNames, roles, roleNames, departments, departmentNames, depIds, mgrIds, roleIds }