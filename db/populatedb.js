const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
    firstName VARCHAR (255),
    lastName VARCHAR (255),
    email VARCHAR ( 255 ) UNIQUE,
    password VARCHAR ( 255 ) UNIQUE,
    admin VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
    username VARCHAR(255) REFERENCES users(email),
    text VARCHAR (255), 
    timestamp VARCHAR (255)
);`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  await client.connect();
  await client.query(SQL);
  console.log("done");
}

main();
