const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(require("./middleware/logger"));
app.use(express.static("public"));
app.use("/user", require("./route/memberRouter"));

app.get("/", (req, res) => {
  res.status(200).sendFile(require("./public/index.html"));
});

app.post("/", (req, res) => {
  const { body } = req.body;
  console.log(body);
  res.status(200).send();
});

app.listen(3000, () => {
  console.log("server start!");
});
