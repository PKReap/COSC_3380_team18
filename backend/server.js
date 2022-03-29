const http = require("http");
const paths = require("./src/MySQLConnection");

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET",
    "Access-Control-Max-Age": 0, // 30 days
    "Content-Type": "application/json",
  };
  const path = req.url.slice(5); // slice the "/api/"
  console.log(path);
  const responseHandler = paths[path]; //  here it geting the function
  if (responseHandler) {
    res.writeHead(200, headers);
    if (req.method === "GET") {
      responseHandler((result) => {
        res.end(JSON.stringify(result));
      });
    } else if (req.method === "POST") {
      req.on("data", (data) => {
        const args =  Object.values(JSON.parse(data));
        responseHandler(...args, (result) => {
          res.end(JSON.stringify(result));
        });
      });
    }
  } else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

const host = "0.0.0.0";
const port = 3000;

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
