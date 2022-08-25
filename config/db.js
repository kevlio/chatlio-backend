const mysql = require("mysql2");

const db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

const room = `CREATE TABLE IF NOT EXISTS rooms(
  id INT NOT NULL AUTO_INCREMENT,
  room_name VARCHAR(255) UNIQUE,
  time TEXT,
  PRIMARY KEY (id)
  )`;

const user = `CREATE TABLE IF NOT EXISTS users(
  id TEXT, 
  username VARCHAR(255) PRIMARY KEY,
  active_room TEXT
  )`;

const message = `CREATE TABLE IF NOT EXISTS messages(
  message TEXT NOT NULL,
  username TEXT,
  room_name VARCHAR(255),
  user_id TEXT,
  avatar TEXT,
  color TEXT,
  time TEXT,
  CONSTRAINT fk_room_name 
  FOREIGN KEY(room_name) 
  REFERENCES rooms(room_name)
  ON DELETE CASCADE
  )`;

db.connect((error) => {
  console.log("connect");
  if (error) throw error;

  db.query(room, (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      console.log("Rooms table already created");
    }
  });

  db.query(user, (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      console.log("Users table already created");
    }
  });

  db.query(message, (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      console.log("Messages table already created");
    }
  });
});

module.exports = db;
