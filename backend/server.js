const http = require("http");
const paths = require("./src/MySQLConnection");

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Max-Age": 0, 
    "Content-Type": "application/json",
  };
  const path = req.url.slice(5);
  console.log(path);
  const responseHandler = paths[path]; //  here it geting the function
  /*
    if (responseHandler) {
    res.writeHead(200, headers);
    req.on("data", (data) => {
      const args = JSON.parse(data);
      responseHandler(args, (result) => {
        res.end(JSON.stringify(result));
      });
    });

  */
  if (responseHandler) {
    res.writeHead(200, headers);
    const chuncks = [];
    req.on("data", (data) => {
      chuncks.push(data);
    });
    req.on("end", () => {
      const body = Buffer.concat(chuncks).toString();
      const args = JSON.parse(body);
      responseHandler(args, (response) => {
        res.end(JSON.stringify(response));
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
