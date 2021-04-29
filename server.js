const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
// dont look so deeply
app.use(express.urlencoded( {extended: false }));
// youre getting json-ed
app.use(express.json());

// Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         // My MySQL username,
//         user: 'root',
//         // My MySQL password
//         password: '!a3qF6?21>dpug',
//         database: 'election'
//     },
//     console.log('Connected to the election database.')
// );

// // GET a single candidate from db election
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// // Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//                 VALUES (?,?,?,?)`;

// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//     console.log(err);
//     }
//     console.log(result);
// });


// // Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });



// Default response for any other request (Not Found)
// PLACEMENT IS IMPORTANT!! IF IT IS ABOVE ANY GET ROUTES, IT WILL OVERRIDE THE ONES BELOW IT!!!
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});