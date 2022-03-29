const { query } = require("./connection");

function validateUser(username, password, method, callback) {
  if (method !== "POST") return;
  // if user name or password contains special characters, return { error: "Invalid username or password" }
  if (username.match(/[^a-zA-Z0-9]/)) {
    callback({ error: "Invalid username or password" });
    return;
  }
  const sql = `SELECT * FROM Users WHERE Username = '${username}' AND UserPassword = '${password}'`;
  query(sql, (result) => {
    const response = {
      validation: result.length > 0,
    };
    callback(response);
  });
}

function getAllUsers(method, callback) {
  if (method !== "GET") return;
  const sql = "SELECT * FROM Users";
  query(sql, (result) => {
    callback(result);
  });
}



module.exports = { validateUser, getAllUsers };
