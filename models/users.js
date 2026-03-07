const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

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
async function authenticate(username, password)
{
  let result = await db.get(
    "SELECT * FROM Users WHERE username = ? AND password = ?",
    [username, password]
  );

  return result;
}

module.exports = {authenticate};