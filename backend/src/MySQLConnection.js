const { query } = require("./connection");

const UserTypes = {
  Admin: 1,
  Artist: 2,
  User: 3,
}


function validateUser(args, callback) {
  const { username, password } = args;
  if ((username + password).match(/[^a-zA-Z0-9]/)) {
    // cleaning the username and password against SQL injection
    callback({ error: "Invalid username or password" });
    return;
  }
  const sql = `SELECT * FROM Users WHERE Username = '${username}' AND UserPassword = '${password}'`;
  query(sql, (result) => {
    const { UserID, UserType } = result.users;

    const response = {
      validation: result.length > 0,
      UserID,
      UserType,
    };

    callback(response);
  });
}

function getAllUsers(args, callback) {
  const sql = "SELECT * FROM Users";
  query(sql, (result) => {
    const response = {
      users: result.filter((user) => user.IsDeleted === 0),
    };
    callback(response);
  });
}

function registerUser(args, callback) {
  const { username, password } = args;
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
    if (result.length > 0) {
      callback({ error: "Username already exists" });
      return;
    }

    const sql = `INSERT INTO Users (Username, UserPassword) VALUES ('${username}', '${password}')`;
    query(sql, (error, result) => {
      if (error) callback({ error: "Error registering user" });
      else callback({ success: "User registered successfully" });
    });
  });
}

function makeArtist(args, callback) {
  const { userID } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.Artist} WHERE UserID = ${userID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error making user an Artist" });
    else callback({ success: "Artist succfully made" });
  });
}

function makeUser(args, callback) {
  const { userID } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.User} WHERE UserID = ${userID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error updating to User" });
    else callback({ success: "User succfully updated" });
  });
}

function makeAdmin(args, callback) {
  const { userID } = args;
  const sql = `UPDATE Users SET UserType = ${UserTypes.Admin} WHERE UserID = ${userID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error updating to Admin"});
    else callback({ success: "Admin succfully updated" });
  });
}

function deleteUser(args, callback) {
  const { userID } = args;
  const sql = `UPDATE Users SET IsDeleted = 1 WHERE UserID = ${userID}`;
  query(sql, (error, result) => {
    if (error) callback({ error: "Error deleting user" });
    else callback({ success: "User succfully deleted" });
  });
}

module.exports = {
  validateUser,
  getAllUsers,
  registerUser,
  makeArtist,
  makeUser,
  makeAdmin,
  deleteUser,
};
