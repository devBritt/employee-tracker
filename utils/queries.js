// SelectQuery class will take the chosen operation string and create the corresponding query
class SelectQuery {
    constructor() {
        // query for all employees
        this.allEmployees = `SELECT a.id, a.first_name, a.last_name, department_name AS department, role_title AS title, salary, CONCAT_WS('', b.first_name, ' ', b.last_name) AS manager
        FROM employees a
        LEFT JOIN employees b ON a.manager_id=b.id
        LEFT JOIN roles ON a.role_id=roles.id
        LEFT JOIN departments ON department_id=departments.id`;
        // query for employees by role
        this.employeesByRole = `SELECT employees.id, first_name, last_name
        FROM employees
        LEFT JOIN roles ON role_id=roles.id
        WHERE role_id=?`;
        // query for employees by manager
        this.employeesByManager = `SELECT a.id, a.first_name, a.last_name
        FROM employees a
        LEFT JOIN employees b ON a.manager_id=b.id
        WHERE a.manager_id=?`;
        // query for all roles
        this.allRoles = `SELECT roles.id, role_title, department_name
        FROM roles
        LEFT JOIN departments ON department_id=departments.id`;
        // query for roles by department
        this.rolesByDepartment = `SELECT roles.id, role_title
        FROM roles
        LEFT JOIN departments ON department_id=departments.id
        WHERE department_id=?`;
        // query for all departments
        this.allDepartments = `SELECT * FROM departments`
    };

    getAllEmployees() {
        return this.allEmployees;
    };

    getEmployeesByRole() {
        return this.employeesByRole;
    };

    getEmployeesByManager() {
        return this.employeesByManager;
    };

    getAllRoles() {
        return this.allRoles;
    };

    getRolesByDepartment() {
        return this.rolesByDepartment;
    };

    getAllDepartments() {
        return this.allDepartments;
    };
}

class AddQuery {
    constructor() {
        this.addEmployee = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        this.addRole = `INSERT INTO roles (role_title, salary, department_id)
        VALUES (?, ?, ?)`;
    };

    getAddEmployee() {
        return this.addEmployee;
    };

    getAddRole() {
        return this.addRole;
    };
}

class UpdateQuery {
    constructor() {
        // query for all employees
        this.addEmployee = ``;
    };

    getAddEmployee() {
        return this.addEmployee;
    };
}

class DeleteQuery {
    constructor() {
        // query for all employees
        this.addEmployee = ``;
    };

    getAddEmployee() {
        return this.addEmployee;
    };
}

module.exports = {
    SelectQuery,
    AddQuery,
    UpdateQuery,
    DeleteQuery
};
