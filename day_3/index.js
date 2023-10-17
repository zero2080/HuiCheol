const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const user = JSON.parse(body);
      console.log("toObject : " + user);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      let result = JSON.stringify(user);
      console.log("toString : " + result);
      res.end(user);
    });
  } else if (req.url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify([]));
  } else {
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
