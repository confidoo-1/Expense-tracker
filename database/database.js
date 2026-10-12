const Database = require("better-sqlite3");
const db = new Database("expense.db");
db.exec(`
CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount INTEGER NOT NULL,
    category TEXT NOT NULL,
    date DATE NOT NULL
);
`);

module.exports = db;
