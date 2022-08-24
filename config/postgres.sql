CREATE DATABASE chat;

CREATE TABLE rooms(
    room_id SERIAL PRIMARY KEY,
    room_name TEXT,
    time_created TEXT,
)