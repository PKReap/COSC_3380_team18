const http = require("http");
const paths = require("./src/MySQLConnection");
const { connect, close, connection } = require("./src/connection");

// handle connection to database

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Content-Type": "application/json",
  };
  const path = req.url.slice(1);
  console.log(path);
  const responseHandler = paths[path]; //  here it geting the function
  if (responseHandler) {
    req.on("data", (data) => {
      const args = Object.values(JSON.parse(data));
      console.log(args);
      responseHandler(...args, req.method, (result) => {
        res.writeHead(200, headers); //  return type is a json object
        res.end(JSON.stringify(result));
      });
    });
  } else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

const host = "localhost";
const port = 3000;

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

server.on("connection", (socket) => {
  console.log("New client connected");
  if (connection.state === "disconnected") {
    connect();
  }
});

server.on("close", () => {
  console.log("Server closed");
  if (connection.state === "connected") {
    close();
  }
});

server.on("error", (err) => {
  console.log("Server error:", err);
  if (connection.state === "connected") {
    close();
  }
});

server.on("clientError", (err, socket) => {
  console.log("Client error:", err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  if (connection.state === "connected") {
    close();
  }
});
