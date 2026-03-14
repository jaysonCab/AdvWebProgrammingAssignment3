const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const bcrypt = require("bcrypt");

async function init() {
  try {
    db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
    });
  } catch(err) {
      console.error(err);
  }
}

init();

// Grab username and password from database for auth purposes
// When logging in, ensure you are comparing the password to the hashed stored in database.
async function authenticate(username, password)
{
  let result = await db.get(
    "SELECT * FROM Users WHERE username = ?",
    [username]
  );

  if (!result) {
    return null;
  }

  const match = await bcrypt.compare(password, result.password);

  if (match) {
    return result;
  } else {
    return null;
  }
}

// Create a new user
async function createUser(username, password, access_level)
{
  // Need to hash the password first
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.run(
    "INSERT INTO Users VALUES (?,?,?)",
    [username, hashedPassword, access_level]
  );
}

async function getAllUsers()
{
  return await db.all("select username, password, level FROM Users");
}

module.exports = {authenticate, createUser, getAllUsers};