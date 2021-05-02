const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!a3qF6?21>dpug',
    database: 'election'
})

module.exports = db;