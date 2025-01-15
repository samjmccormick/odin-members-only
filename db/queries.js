const pool = require("./pool");

async function addUser(requestBody, hashedPassword) {
  const { firstName, lastName, email, admin } = requestBody;
  await pool.query(
    "INSERT INTO users (firstName, lastName, email, password, admin) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, email, hashedPassword, admin]
  );
}
//don't forget to export queries
module.exports = { addUser };
