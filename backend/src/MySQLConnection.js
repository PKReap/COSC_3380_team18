const { query } = require("./connection");

function validateUser(username, password, callback) {
  if ((username + password).match(/[^a-zA-Z0-9]/)) {
    // cleaning the username and password against SQL injection
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

function getAllUsers(callback) {
  const sql = "SELECT * FROM Users";
  query(sql, (result) => {
    const response = {
      users: result,
    };
    callback(response);
  });
}

function registerUser(username, password, callback) {
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
  const checkUserName = `SELECT * FROM Users WHERE Username = '${username}'`;
  query(checkUserName, (result) => {
    if (result) {
      callback({ error: "Username already exists" });
      return;
    }
    // Insert the new user into the database
    
    const sql = `INSERT INTO Users (Username, UserPassword) VALUES ('${username}', '${password}')`;
    query(sql, (error, result) => {
      if (error) callback({ error: "Error registering user" });
      else callback({ success: "User registered successfully" });
    });
  });
}

function getAllUsersType(callback) {
  const sql = "SELECT * FROM UserType";
  query(sql, (result) => {
    const response = {
      users: result,
    };
    callback(response);
  });
}

module.exports = { validateUser, getAllUsers, registerUser, getAllUsersType };
