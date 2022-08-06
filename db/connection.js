const mysql = require('mysql2');
const user = require('../configs/configs');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: user.username,
        password: user.password,
        database: 'company'
    },
    console.log('Connected to the company database 🖥️')
);

module.exports = db;