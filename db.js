const sqlite3 = require('sqlite3').verbose();
const { CREATE_TABLES, INSERT_INTO_TABLES } = require('./constants');

const DB_PATH = process.env.DB_PATH || 'database.db';

let db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log('[ db.js ] Connected to the in-memory SQlite database.');

  db.serialize(() => {
    const statements = [...CREATE_TABLES, ...INSERT_INTO_TABLES];

    for (const statement of statements) {
      db.run(statement);
    }
  });
});

module.exports = db
