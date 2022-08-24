const { Client } = require("pg");

const roomStmt = `
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    room_name TEXT UNIQUE,
    time TEXT)
`;

const userStmt = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT,
    username TEXT PRIMARY KEY,
    active_room TEXT)
`;

const messagestmt = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    username TEXT, room_name TEXT,
    user_id TEXT, avatar TEXT,
    color TEXT,
    time TEXT,
    CONSTRAINT fk_room_name 
    FOREIGN KEY(room_name) 
    REFERENCES rooms(room_name)
    ON DELETE CASCADE
    )
`;

const db = new Client({
  user: "postgres",
  host: "localhost",
  password: "password",
  port: 5432,
  //   ssl: {
  //     rejectUnauthorized: false,
  //     // Bör aldrig sättas till rejectUnauthorized i en riktig applikation
  //     // https://stackoverflow.com/questions/63863591/is-it-ok-to-be-setting-rejectunauthorized-to-false-in-production-postgresql-conn
  //   },
  //   //   Should this be changed to Heroku link?
  //   connectionString:
  //     "postgres://fwmqdpixjfhxde:bf594a55557ad3580ga85cb8af44b2e8809a21903268697e61eb602d448da84c@ec2-14-253-119-24.eu-west-1.compute.amazonaws.com:5432/dnqk6u2hrj8d71",
});

db.connect(); // Ansluter till Databasen med hjälp av connectionString'en

module.exports = db;
