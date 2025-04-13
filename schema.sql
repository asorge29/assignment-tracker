--Database schema
--To set up for local dev install wrangler cli and run: wrangler d1 execute assignment-tracker --local --file ./schema.sql

CREATE TABLE IF NOT EXISTS assignments 
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    email    TEXT    NOT NULL,
    title    TEXT    NOT NULL,
    link     TEXT,
    due_date TEXT    NOT NULL,
    class    INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS classes
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users 
(
    email TEXT PRIMARY KEY NOT NULL, 
    settings TEXT
);
