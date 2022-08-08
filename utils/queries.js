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
        this.addDepartment = `INSERT INTO departments (department_name)
        VALUES (?)`;
    };

    getAddEmployee() {
        return this.addEmployee;
    };

    getAddRole() {
        return this.addRole;
    };

    getAddDepartment() {
        return this.addDepartment;
    };
}

class UpdateQuery {
    constructor() {
        // query to update an employee's role
        this.updateRole = `UPDATE employees
        SET role_id=?
        WHERE id=?`;
        // query to update an employee's manager
        this.updateManager = `UPDATE employees
        SET manager_id=?
        WHERE id=?`;
    };

    getUpdateRole() {
        return this.updateRole;
    };
    
    getUpdateManager() {
        return this.updateManager;
    };
}

class DeleteQuery {
    constructor() {
        this.deleteEmployee = `DELETE FROM employees WHERE id=?`;
        this.deleteRole = `DELETE FROM roles WHERE id=?`;
        this.deleteDepartment = `DELETE FROM departments WHERE id=?`;
    };

    getDelEmployee() {
        return this.deleteEmployee;
    };

    getDelRole() {
        return this.deleteRole;
    };

    getDelDepartment() {
        return this.deleteDepartment;
    };
}

module.exports = {
    SelectQuery,
    AddQuery,
    UpdateQuery,
    DeleteQuery
};
