const db = require("../config/db");

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

  const sql = `INSERT INTO ${process.env.SCHEMA}.rooms (room_name) VALUES (?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [roomName], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function getRooms() {
  const sql = `SELECT * FROM ${process.env.SCHEMA}.rooms`;
  return new Promise((resolve, reject) => {
    db.query(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getRoom(roomName) {
  const sql = `SELECT * FROM ${process.env.SCHEMA}.rooms WHERE room_name = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, roomName, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// DELETE ONE ROOM (and messages connected to room)
function deleteRoom(roomName) {
  const sql = `DELETE from ${process.env.SCHEMA}.rooms where room_name = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [roomName], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  addRoom,
  deleteRoom,
  getRooms,
  getRoom,
};
