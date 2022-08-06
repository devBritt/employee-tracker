const db = require('./db/connection');
const { prompt } = require('inquirer');
const createQuestions = require('./utils/createQuestions');
const format = require('./utils/formatOutput');

// connect to database
db.connect(err => {
    if(err) throw err;
});

// function to prompt users for input
async function propmtUser() {
    return await
        prompt(await createQuestions())
        .then(response => {
            return response;
        });
};

// run app after database connects
async function runApp() {
    const answers = await propmtUser();
    console.log(answers);
}

runApp();

db.end(err => {
    console.log(err);
})
