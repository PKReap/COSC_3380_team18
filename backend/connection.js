const mysql = require("mysql");

mysqlConnection = mysql.createConnection({
// this is the connection to the database
  host: "remotemysql.com",
  user: "OqC9416vf3",
  password: "exFtpOIdTy",
  database: "OqC9416vf3",
});

mysqlConnection.connect((err) => {
  // connecting to the database
  const messge = err
    ? `Error connecting to database: ${err.stack}`
    : `Connected to database`;
  console.log(messge);
});

mysqlConnection.query("SELECT * FROM Users", (err, rows, fields) => {
  // querying to get all the users
  const messgage = err ? err : rows;
  console.log(messgage);
});

mysqlConnection.end((err) => {
  // closing the connection
  const messge = err
    ? `Error ending connection to database: ${err.stack}`
    : `Connection ended`;
  console.log(messge);
});


