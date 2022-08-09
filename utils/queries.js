// SelectQuery class will take the chosen operation string and create the corresponding query
class Queries {
    constructor() {
        // query string for all employees
        this.allEmployees = `SELECT a.id, a.first_name, a.last_name, department_name AS department, role_title AS title, salary, CONCAT_WS('', b.first_name, ' ', b.last_name) AS manager
        FROM employees a
        LEFT JOIN employees b ON a.manager_id=b.id
        LEFT JOIN roles ON a.role_id=roles.id
        LEFT JOIN departments ON department_id=departments.id`;
        // query string for employees by role
        this.employeesByRole = `SELECT a.id, a.first_name, a.last_name, department_name AS department, salary, CONCAT_WS('', b.first_name, ' ', b.last_name) AS manager
        FROM employees a
        LEFT JOIN employees b ON a.manager_id=b.id
        LEFT JOIN roles ON a.role_id=roles.id
        LEFT JOIN departments ON department_id=departments.id
        WHERE a.role_id=?`;
        // query string for employees by manager
        this.employeesByManager = `SELECT a.id, a.first_name, a.last_name, department_name AS department, role_title AS title, salary
        FROM employees a
        LEFT JOIN roles ON a.role_id=roles.id
        LEFT JOIN employees b ON a.manager_id=b.id
        LEFT JOIN departments ON department_id=departments.id
        WHERE a.manager_id=?`;
        // query string for all roles
        this.allRoles = `SELECT roles.id, role_title, salary, department_name
        FROM roles
        LEFT JOIN departments ON department_id=departments.id`;
        // query string for roles by department
        this.rolesByDepartment = `SELECT roles.id, role_title, salary
        FROM roles
        LEFT JOIN departments ON department_id=departments.id
        WHERE department_id=?`;
        // query string for all departments
        this.allDepartments = `SELECT * FROM departments`;
        // query string to add an employee
        this.addEmployee = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        // query string to add a role
        this.addRole = `INSERT INTO roles (role_title, salary, department_id)
        VALUES (?, ?, ?)`;
        // query string to add a department
        this.addDepartment = `INSERT INTO departments (department_name)
        VALUES (?)`;
        // query string to update an employee's role
        this.updateRole = `UPDATE employees
        SET role_id=?
        WHERE id=?`;
        // query string to update an employee's manager
        this.updateManager = `UPDATE employees
        SET manager_id=?
        WHERE id=?`;
        // query string to delete an employee
        this.deleteEmployee = `DELETE FROM employees WHERE id=?`;
        // query string to delete a role
        this.deleteRole = `DELETE FROM roles WHERE id=?`;
        // query string to delete a department
        this.deleteDepartment = `DELETE FROM departments WHERE id=?`;
        // query string to view the payroll budget for a department
        this.payrollBudget = `SELECT department_name, SUM(salary) AS payroll_budget
        FROM employees
        LEFT JOIN roles ON role_id=roles.id
        LEFT JOIN departments ON department_id=departments.id
        WHERE departments.id=?`;
    };

    getQueryString(action) {
        switch (action) {
            case 'All Employees': 
                return this.allEmployees;
            case 'By Role': 
                return this.employeesByRole;
            case 'By Manager': 
                return this.employeesByManager;
            case 'Add an Employee': 
                return this.addEmployee;
            case "Change Employee's Role": 
                return this.updateRole;
            case "Change Employee's Manager": 
                return this.updateManager;
            case 'Remove an Employee': 
                return this.deleteEmployee;
            case 'All Roles': 
                return this.allRoles;
            case 'By Department': 
                return this.rolesByDepartment;
            case 'Add a Role': 
                return this.addRole;
            case 'Remove a Role': 
                return this.deleteRole;
            case 'View Departments': 
                return this.allDepartments;
            case 'Add a Department': 
                return this.addDepartment;
            case 'Remove a Department': 
                return this.deleteDepartment;
            case 'View Payroll Budgets': 
                return this.payrollBudget;
            default: 
                break;
        }
    };
}

module.exports = Queries;
