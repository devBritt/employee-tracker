// SelectQuery class will take the chosen operation string and create the corresponding query
class SelectQuery {
    constructor() {
        // query for all employees
        this.viewAllEmployees = `SELECT a.id, a.first_name, a.last_name, department_name AS department, role_title AS title, salary, CONCAT_WS('', b.first_name, ' ', b.last_name) AS manager
        FROM employees a
        LEFT JOIN employees b ON a.manager_id=b.id
        LEFT JOIN roles ON a.role_id=roles.id
        LEFT JOIN departments ON department_id=departments.id`;
        // query for employees by role
        this.employeesByRole = `SELECT employees.id, first_name, last_name
        FROM employees
        LEFT JOIN roles ON role_id=roles.id
        WHERE role_id=?`;
    };

    getAllEmployees() {
        return this.viewAllEmployees;
    };

    getEmployeesByRole() {
        return this.employeesByRole;
    }
}

module.exports = SelectQuery;

