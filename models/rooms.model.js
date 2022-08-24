const db = require("../config/postgres");

// ADD ONE ROOM
async function addRoom(roomName) {
  // EXTRA CHECKER FOR UNIQUE CONSTRAINT FAILURE
  // MOVE CHECKER LOGIC FROM HERE AND SERVER TO CONTROLLER
  const rooms = await getRooms();
  const checkRoom = await rooms.filter((room) => {
    return room.room_name === roomName;
  });
  if (checkRoom.length !== 0) {
    console.log("Room exist, join room");
    return false;
  }

  const sql = "INSERT INTO rooms (room_name) VALUES ($1)";
  const result = await db.query(sql, [id, roomName]);
  console.log(result);
  return result.rows;
}

function getRooms() {
  const sql = "SELECT * FROM rooms";
  const result = await db.query(sql);
  console.log(result);
  return result.rows;
}

function getRoom(roomName) {
  const sql = "SELECT * FROM rooms WHERE room_name = $1";
  const result = await db.query(sql, roomName);
  console.log(result);
  return result.rows;
}

// DELETE ONE ROOM (and messages connected to room)
function deleteRoom(roomName) {
  const sql = "DELETE from rooms where room_name = $1";
  const result = await db.query(sql, roomName);
  console.log(result);
  return result.rows;
}

module.exports = {
  addRoom,
  deleteRoom,
  getRooms,
  getRoom,
};
