const mysql = require("mysql");
const config = require("../config-test");
const connection = mysql.createConnection(config);

function connect() {
  connection.connect();
}
function query(sql, callback) {
  connection.query(sql, (err, results) => {
    callback(results);
  });
}
function close() {
  connection.end();
}

module.exports = { connect, query, close };
