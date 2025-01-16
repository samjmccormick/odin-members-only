const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function addUser(requestBody, hashedPassword) {
  const { firstName, lastName, email, admin } = requestBody;
  await pool.query(
    "INSERT INTO users (firstName, lastName, email, password, admin) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, email, hashedPassword, admin]
  );
}

async function joinMembership(attemptedPassword, res) {
  const { rows } = await pool.query("SELECT * FROM memberConfirm");
  const memberPassword = rows[0].password;
  const match = await bcrypt.compare(attemptedPassword, memberPassword);
  console.log(match);
  if (match) {
    await pool.query("UPDATE users SET member = 'member' WHERE id = $1", [
      res.locals.currentUser.id,
    ]);
  }
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function postNewPost(text, currentUser) {
  const message = {
    username: currentUser.email,
    text: text,
    timestamp: new Date(),
  };
  await pool.query(
    "INSERT INTO messages (username, text, timestamp) VALUES ($1, $2, $3)",
    [message.username, message.text, message.timestamp]
  );
}

//don't forget to export queries
module.exports = { addUser, joinMembership, getAllMessages, postNewPost };
