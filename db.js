const { Database } = require("sqlite3");

const db = new Database("db.sqlite3", (err) => {
  if (err) {
    console.error("Cannot connect to database");
    process.exit(1);
  }
});

module.exports = { db };
