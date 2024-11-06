const sqlite3 = require("sqlite3").verbose();

// Initialize SQLite database connection
// const sqdb = new sqlite3.Database("./database/database.db", (err) => {
//   if (err) {
//     console.error("Could not connect to database", err);
//   } else {
//     console.log("Connected to SQLite database");
//   }
// });
const mysql = require("mysql2");
// MySQL connection
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
console.log("Attempting to connect to MySQL...");
db.connect((err) => {
  if (err) {
    console.error("Could not connect to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

// // Create Sqlite User Table if it doesn't exist
// db.run(
//   `
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE,
//     password TEXT
//   )
// `,
//   (err) => {
//     if (err) {
//       console.error("Error creating table:", err.message);
//     } else {
//       console.log("User table is ready");
//     }
//   }
// );
// Create User Table if it doesn't exist

db.query(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  )
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("User table is ready");
    }
  }
);
module.exports = db;
