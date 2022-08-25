const db = require("../config/db");

function addMessage({
  message,
  username,
  user_id,
  room_name,
  color,
  avatar,
  time,
}) {
  const sql = `INSERT INTO ${process.env.SCHEMA}.messages (message, username, user_id, room_name, color, avatar, time) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [message, username, user_id, room_name, color, avatar, time],
      (error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve();
      }
    );
  });
}

function getRoomMessages(roomName) {
  const sql = `SELECT * FROM ${process.env.SCHEMA}.messages WHERE room_name = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [roomName], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// // DELETE ONE ROOM / REPLACED WITH CONSTRAINT, FK, DELETE CASCADE
function deleteRoomMessages(roomName) {
  const sql = `DELETE from ${process.env.SCHEMA}.messages where room_name = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [roomName], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  addMessage,
  deleteRoomMessages,
  getRoomMessages,
};
