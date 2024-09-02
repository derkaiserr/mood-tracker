const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/moods.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the moods database.');
});

db.run(`CREATE TABLE IF NOT EXISTS moods(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood INTEGER NOT NULL
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Moods table created");
});

module.exports = db;