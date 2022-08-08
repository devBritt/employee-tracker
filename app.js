const mysql = require('mysql2/promise');
const user = require('./configs/configs');
const { prompt } = require('inquirer');
const createQuestions = require('./utils/createQuestions');
const format = require('./utils/formatOutput');
const {
    SelectQuery,
    AddQuery,
    UpdateQuery,
    DeleteQuery
} = require('./utils/queries');

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
        return await
            prompt(await createQuestions())
            .then(response => {
                return response;
            });
    };

    const answers = await propmtUser();
    console.log(answers);
    const select = new SelectQuery();
    const remove = new DeleteQuery();
    const [rows] = await db.execute(select.getAllDepartments());
    console.log(rows);
}

runApp();
