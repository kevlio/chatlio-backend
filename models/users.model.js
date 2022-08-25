const db = require("../config/db");

// ADD ONE USER
async function addUser(id, username) {
  // EXTRA CHECKER FOR UNIQUE CONSTRAINT FAILURE
  // MOVE CHECKER LOGIC FROM HERE AND SERVER TO CONTROLLER
  const users = await getUsers();
  const checkUser = await users.filter((user) => {
    return user.username === username;
  });

  if (checkUser.length !== 0) {
    console.log("Send error message");
    return false;
  }

  const sql =
    "INSERT INTO heroku_a29865f5352b027.users (id, username) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [id, username], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

// GET ALL USERS
function getUsers() {
  const sql = "SELECT * FROM heroku_a29865f5352b027.users";
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

// GET ONE USER
function getOneUser(id, username) {
  console.log(id);
  console.log(username);
  const sql =
    "SELECT * FROM heroku_a29865f5352b027.users WHERE id = ? AND name = ?";
  return new Promise((resolve, reject) => {
    db.get(sql, [id, username], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// UPDATE USERS ACTIVE ROOM / BETTER SOLUTION?
function updateActiveRoom(roomName, username) {
  const sql =
    "UPDATE heroku_a29865f5352b027.users SET active_room = ? WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [roomName, username], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function removeActiveRoom(roomName) {
  const sql =
    "UPDATE heroku_a29865f5352b027.users SET active_room = null WHERE active_room = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, roomName, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

// GET ONE USER
function getUsersInRoom(roomName) {
  console.log(roomName);
  const sql =
    "SELECT username FROM heroku_a29865f5352b027.users WHERE active_room = ?";
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

// DELETE ALL CLIENT CONNECTED USERS
function deleteUsers(clientID) {
  const sql = "DELETE from heroku_a29865f5352b027.users where id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [clientID], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

// DELETE ALL USERS
function deleteAllUsers() {
  const sql = "DELETE from heroku_a29865f5352b027.users";
  return new Promise((resolve, reject) => {
    db.query(sql, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  addUser,
  getUsers,
  getOneUser,
  deleteUsers,
  updateActiveRoom,
  getUsersInRoom,
  removeActiveRoom,
  deleteAllUsers,
};
