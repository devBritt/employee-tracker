const mysql = require('mysql2/promise');
const user = require('./configs/configs');
const { prompt } = require('inquirer');
const createQuestions = require('./utils/createQuestions');
const format = require('./utils/formatOutput');
const Queries = require('./utils/queries');

// instance of Queries object for retrieving query strings
const queriesObj = new Queries();

// function to extract id from string for queries
function getID(string) {
    const idString = string.split(' ')[0];

    return idString.slice(2);
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
        
        switch (answers.actions) {
            case 'View Employees':
                switch (answers.employeeViews) {
                    case 'All Employees':
                        const [ allEmployees ] = await db.query(queriesObj.getQueryString(answers.employeeViews));
                        console.log(allEmployees);
                        break;
                    case 'By Role':
                        const roleId = [];
                        roleId.push(getID(answers.byRolesSelect));
                        const [ employeesByRoles ] = await db.execute(queriesObj.getQueryString(answers.employeeViews), roleId);
                        console.log(employeesByRoles);
                        break;
                    case 'By Manager':
                        const managerId = [];
                        managerId.push(getID(answers.byManagersSelect));
                        const [ employeesByManager ] = await db.execute(queriesObj.getQueryString(answers.employeeViews), managerId);
                        console.log(employeesByManager);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    queryDb();
}

runApp();
