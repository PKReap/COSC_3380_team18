const { query } = require("./connection");

function validateUser(username, password, method, callback) {
  if (method !== "POST") return;
  if ((username + password).match(/[^a-zA-Z0-9]/)) {
    callback({ error: "Invalid username or password" });
    return;
  }
  if (password.length < 8) {
    callback({ error: "Password must be at least 8 characters" });
    return;
  }
  if (!password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
    callback({
      error:
        "Password must contain at least one uppercase letter and one number",
    });
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

function getAllUsers(callback) {
  const sql = "SELECT * FROM Users";
  query(sql, (result) => {
    const response = {
      users: result,
    };
    callback(response);
  });
}

module.exports = { validateUser, getAllUsers };
