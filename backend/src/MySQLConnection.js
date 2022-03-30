const { query } = require("./connection");

function validateUser(args , callback) {
  const { Username, UserPassword } = args;
  if ((Username + UserPassword).match(/[^a-zA-Z0-9]/)) {
    // cleaning the username and password against SQL injection
    callback({ error: "Invalid username or password" });
    return;
  }
  const sql = `SELECT * FROM Users WHERE Username = '${Username}' AND UserPassword = '${UserPassword}'`;
  query(sql, (result) => {
    const response = {
      validation: result.length > 0,
    };
    callback(response);
  });
}

function getAllUsers(args ,callback) {
  const sql = "SELECT * FROM Users";
  query(sql, (result) => {
    const response = {
      users: result,
    };
    callback(response);
  });
}

function registerUser(args, callback) {
  const { Username, UserPassword } = args;

  if ((Username + UserPassword).match(/[^a-zA-Z0-9]/)) {
    callback({ error: "Invalid username or password" });
    return;
  }
  if (UserPassword.length < 8) {
    callback({ error: "Password must be at least 8 characters" });
    return;
  }
  if (!UserPassword.match(/[A-Z]/) || !UserPassword.match(/[0-9]/)) {
    callback({
      error:
        "Password must contain at least one uppercase letter and one number",
    });
    return;
  }
  const checkUserName = `SELECT * FROM Users WHERE Username = '${Username}'`;
  query(checkUserName, (result) => {
    if (result.length > 0) {
      callback({ error: "Username already exists" });
      return;
    }

    const sql = `INSERT INTO Users (Username, UserPassword) VALUES ('${Username}', '${UserPassword}')`;
    query(sql, (error, result) => {
      if (error) callback({ error: "Error registering user" });
      else callback({ success: "User registered successfully" });
    });
  });
}

module.exports = { validateUser, getAllUsers, registerUser };
