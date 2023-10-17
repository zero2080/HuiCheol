const http = require("http");

const server = http.createServer((req, res) => {
  //   if (req.url === "/users" && req.method === "POST") {
  //     let body = "";
  //     req.on("data", (chunk) => {
  //       body += chunk.toString();
  //     });
  //     req.on("end", () => {
  //       const user = JSON.parse(body);
  //       res.statusCode = 201;
  //       res.setHeader("Content-Type", "application/json");
  //       res.end(JSON.stringify(user));
  //     });
  //   } else if (req.url === "/users") {
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "application/json");
  //     res.end(JSON.stringify([]));
  //   } else {

  console.log(req.url);
  console.log(req.method);
  //   console.log(res);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    "<!DOCTYPE html><html><head><title>Simple Server</title></head><body><h1>Hello, World!</h1></body></html>"
  );
  //   }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
