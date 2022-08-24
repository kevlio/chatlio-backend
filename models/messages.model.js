const db = require("../config/postgres");

function addMessage({
  message,
  username,
  user_id,
  room_name,
  color,
  avatar,
  time,
}) {
  const sql =
    "INSERT INTO messages (message, username, user_id, room_name, color, avatar, time) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  const result = await db.query(sql, [message, username, user_id, room_name, color, avatar, time])
  console.log(result);
  return result.rows;
}

function getRoomMessages(roomName) {
  const sql = "SELECT * FROM messages WHERE room_name = $1";
  const result = await db.query(sql, roomName);
  console.log(result);
  return result.rows;
}

// // DELETE ONE ROOM / REPLACED WITH CONSTRAINT, FK, DELETE CASCADE
function deleteRoomMessages(roomName) {
  const sql = "DELETE from messages where room_name = $1";
  const result = await db.query(sql, roomName);
  console.log(result);
  return result.rows;
}

module.exports = {
  addMessage,
  deleteRoomMessages,
  getRoomMessages,
};
