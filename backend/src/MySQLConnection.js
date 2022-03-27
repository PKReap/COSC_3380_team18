const { query } = require("./connection");

function validateUser(username, password, method, callback) {
  if (method !== "POST") return;
  const sql = `SELECT * FROM Users WHERE Username = '${username}' AND UserPassword = '${password}'`;
  query(sql, (result) => {
    const response = {
      validation: result.length > 0,
    };
    callback(response);
  });
}

module.exports = { validateUser };
