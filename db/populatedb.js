const { Client } = require("pg");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const messages = [
  {
    username: "dum@dum.com",
    text: "hello",
    timestamp: new Date(),
  },
  {
    username: "dum@dum.com",
    text: "hellos",
    timestamp: new Date(),
  },
  {
    username: "dum@dum.com",
    text: "helloish",
    timestamp: new Date(),
  },
];

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
    firstName VARCHAR (255),
    lastName VARCHAR (255),
    email VARCHAR ( 255 ) UNIQUE,
    password VARCHAR ( 255 ) UNIQUE,
    admin VARCHAR (255),
    member VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
    username VARCHAR(255) REFERENCES users(email) NOT NULL,
    text VARCHAR (255), 
    timestamp VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS memberConfirm (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
password VARCHAR (255) 
);
`;

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
  bcrypt.hash(process.env.MEMBERPASSWORD, 10, async (err, hashedPassword) => {
    if (err) {
      alert("error in hashing");
    } else {
      try {
        await client.query("INSERT INTO memberConfirm (password) VALUES ($1)", [
          hashedPassword,
        ]);
      } catch (err) {
        return { message: err };
      }
    }
  });
  console.log("done");
}

async function populatePassword() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  await client.connect();
  bcrypt.hash(process.env.MEMBERPASSWORD, 10, async (err, hashedPassword) => {
    if (err) {
      alert("error in hashing");
    } else {
      try {
        await client.query("INSERT INTO memberConfirm (password) VALUES ($1)", [
          hashedPassword,
        ]);
      } catch (err) {
        return { message: err };
      }
    }
  });
  console.log("done");
}

async function populateMessages() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  await client.connect();
  messages.map(
    async (message) =>
      await client.query(
        "INSERT INTO messages (username, text, timestamp) VALUES ($1, $2, $3)",
        [message.username, message.text, message.timestamp]
      )
  );
  console.log("done");
}

//main();

populateMessages();
