const db = require("../config/postgres");

// ADD ONE USER
async function addUser(id, username) {
  // EXTRA CHECKER FOR UNIQUE CONSTRAINT FAILURE
  // MOVE CHECKER LOGIC FROM HERE AND SERVER TO CONTROLLER
  const users = await getUsers();
  const checkUser = users.filter((user) => {
    return user.username === username;
  });

  if (checkUser.length !== 0) {
    console.log("Send error message");
    return false;
  }

  const sql = "INSERT INTO users (id, username) VALUES ($1, $2)";
  const result = await db.query(sql, [id, username]);
  console.log(result);
  return result.rows;
}

// GET ALL USERS
function getUsers() {
  const sql = "SELECT * FROM users";
  const result = await db.query(sql)
  return result.rows
}

// GET ONE USER
function getOneUser(id, username) {
  console.log(id);
  console.log(username);
  const sql = "SELECT * FROM users WHERE id = $1 AND name = $2";
  const result = await db.query(sql, [id, username])
  return result.rows
}

// UPDATE USERS ACTIVE ROOM / BETTER SOLUTION IF TIME
function updateActiveRoom(roomName, username) {
  const sql = "UPDATE users SET active_room = $1 WHERE username = $2";
  const result = db.query(sql, [roomName, username])
  return result.rows
}

function removeActiveRoom(roomName) {
  const sql = "UPDATE users SET active_room = null WHERE active_room = $1";
  const result = db.query(sql, roomName)
  console.log(result.rows)
}

// GET ONE USER
function getUsersInRoom(roomName) {
  console.log(roomName);
  const sql = "SELECT username FROM users WHERE active_room = $1";
  const result = db.query(sql, roomName)
  return result.rows
}

// DELETE ALL CLIENT CONNECTED USERS
function deleteUsers(clientID) {
  const sql = "DELETE from users where id = $1";
  const result = db.query(sql, clientID)
}

// DELETE ALL USERS
function deleteAllUsers() {
  const sql = "DELETE from users";
  const result = db.query(sql)
  console.log(result.rows)
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
