const mysql = require("mysql");

mysqlConnection = mysql.createConnection({ // this is the connection to the database
  host: "localhost",
  user: "root",
  password: "password",
  database: "musiclibrary",
});

mysqlConnection.connect((err) => { // connecting to the database
  const messge = err ? `Error connecting to database: ${err.stack}` : `Connected to database`;
  console.log(messge);
});

mysqlConnection.query("SELECT * FROM Users", (err, rows, fields) => { // querying to get all the users
  if (!err) {
    console.log(rows);
  } else {
    console.log(err);
  }
});

mysqlConnection.end((err) => { // closing the connection
  const messge = err ? `Error ending connection to database: ${err.stack}` : `Connection ended`;
  console.log(messge);
});