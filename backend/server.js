const http = require("http");
const paths = require("./src/MySQLConnection");

const host = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  const path = req.url.slice(1);
  const responseHandler = paths[path];
  if (responseHandler) {
    req.on("data", (data) => {
      const args = Object.values(JSON.parse(data),);
      responseHandler(...args,  req.method ,(result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      });
    });
  }
  else{
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});