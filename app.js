const mysql = require('mysql2/promise');
const user = require('./configs/configs');
const { prompt } = require('inquirer');
const createQuestions = require('./utils/createQuestions');
const format = require('./utils/formatOutput');
const Queries = require('./utils/queries');
const { get } = require('http');

// instance of Queries object for retrieving query strings
const queriesObj = new Queries();

// function to extract id from string for queries
function getID(string) {
    const idString = string.split(' ')[0];

    return parseInt(idString.slice(2).trim());
}

async function runApp() {
    // create connection to database
    const db = await mysql.createConnection({
        host: 'localhost',
        user: user.username,
        password: user.password,
        database: 'company'
    });
    
    // function to prompt users for input
    async function propmtUser() {
        // get employees list for prompt questions
        const employees = await db.query(queriesObj.getQueryString('All Employees'));
        // get roles list for prompt questions
        const roles = await db.query(queriesObj.getQueryString('All Roles'));
        // get departments list for prompt questions
        const departments = await db.query(queriesObj.getQueryString('View Departments'));
        // get managers list for prompt questions
        const managers = await db.query(`SELECT * FROM employees WHERE manager_id IS NULL`);

        const questions = createQuestions(employees[0], roles[0], departments[0], managers[0]);

        return await
            prompt(questions)
            .then(response => {
                return response;
            });
    };

    async function queryDb() {
        const answers = await propmtUser();

        if (answers.actions !== 'Quit') {
            const employeeId = [];
            const roleId = [];
            const managerId = [];
            const departmentId = [];

            // extract employee id if it exists
            if (answers.employeeChoice) {
                employeeId.push(getID(answers.employeeChoice));
            } else if (answers.removeEmployee) {
                employeeId.push(getID(answers.removeEmployee));
            }
            
            // extract role id if it exists
            if (answers.byRolesSelect) {
                roleId.push(getID(answers.byRolesSelect));
            } else if (answers.assignRole) {
                roleId.push(getID(answers.assignRole));
            } else if (answers.changeRole) {
                roleId.push(getID(answers.changeRole));
            } else if (answers.removeRole) {
                roleId.push(getID(answers.removeRole));
            }

            // extract department id if it exists
            if (answers.byDepartmentSelect) {
                departmentId.push(getID(answers.byDepartmentSelect));
            } else if (answers.assignDepartment) {
                departmentId.push(getID(answers.assignDepartment));
            } else if (answers.removeDepartment) {
                departmentId.push(getID(answers.removeDepartment));
            } else if (answers.departmentPayroll) {
                departmentId.push(getID(answers.departmentPayroll));
            }

            // extract manager id if it exists
            if (answers.byManagersSelect) {
                managerId.push(getID(answers.byManagersSelect));
            } else if (answers.assignManager) {
                managerId.push(getID(answers.assignManager));
            } else if (answers.changeManager) {
                managerId.push(getID(answers.changeManager));
            }

            switch (answers.actions) {
                case 'View Employees':
                    switch (answers.employeeViews) {
                        case 'All Employees':
                            // query the db
                            const [ allEmployees ] = await db.query(queriesObj.getQueryString(answers.employeeViews));
                            console.log(allEmployees);
                            break;
                        case 'By Role':
                            const [ employeesByRoles ] = await db.execute(queriesObj.getQueryString(answers.employeeViews), roleId);
                            console.log(employeesByRoles);
                            break;
                        case 'By Manager':
                            const [ employeesByManager ] = await db.execute(queriesObj.getQueryString(answers.employeeViews), managerId);
                            console.log(employeesByManager);
                            break;
                        default:
                            break;
                    }
                    break;
                case 'Add an Employee':
                    const params = [];
                    params.push(answers.firstName, answers.lastName, roleId[0], managerId[0]);
                    await db.execute(queriesObj.getQueryString(answers.actions), params);
                    break;
                case 'Update an Employee':
                    switch (answers.updateChoice) {
                        case "Change Employee's Role":
                            const updateRole = [];
                            params.push(roleId[0], employeeId[0]);
                            await db.execute(queriesObj.getQueryString(answers.updateChoice), updateRole);
                            break;
                        case "Change Employee's Manager":
                            const updateManager = [];
                            updateManager.push(managerId[0], employeeId[0]);
                            await db.execute(queriesObj.getQueryString(answers.updateChoice), updateManager);
                            break;
                    }
                    break;
                case 'Remove an Employee':
                    await db.execute(queriesObj.getQueryString(answers.actions), employeeId);
                    break;
                case 'View Roles':
                    switch (answers.roleViews) {
                        case 'All Roles':
                            const [ allRoles ] = await db.query(queriesObj.getQueryString(answers.roleViews));
                            console.log(allRoles);
                            break;
                        case 'By Department':
                            const [ rolesbyDepartment ] = await db.execute(queriesObj.getQueryString(answers.roleViews), departmentId);
                            console.log(rolesbyDepartment);
                            break;
                    }
                    break;
                case 'Add a Role':
                    const roleParams = [];
                    roleParams.push(answers.roleTitle, answers.assignSalary, departmentId[0]);
                    await db.execute(queriesObj.getQueryString(answers.actions), roleParams);
                    break;
                case 'Remove a Role':
                    await db.execute(queriesObj.getQueryString(answers.actions), roleId);
                    break;
                case 'View Departments':
                    // logic here
                    break;
                case 'Add a Department':
                    // logic here
                    break;
                case 'Remove a Department':
                    // logic here
                    break;
                case 'View Payroll Budgets':
                    // logic here
                    break;
                default:
                    break;
            }
        }
    }

    queryDb();
}

runApp();
