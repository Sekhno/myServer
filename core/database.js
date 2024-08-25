const sqlite3 = require('sqlite3').verbose();
const dbName = 'myDatabase.db';


let db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error(err.message)
    }
    else {
        console.log('Connected to the database');
        db.run(`CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, image TEXT)`,
            (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log('Table created successfully or exists');
            }
        })
    }
});

module.exports = db;

// 	•	Контактна інформація:

// CREATE TABLE Contacts (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     phone TEXT NOT NULL,
//     email TEXT
// );

// 	•	Логи системи:

// CREATE TABLE Logs (
//     id INTEGER PRIMARY KEY,
//     timestamp TEXT NOT NULL,
//     message TEXT NOT NULL
// );

// 	•	Файли та зображення:

// CREATE TABLE Files (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     content BLOB NOT NULL
// );