const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./router/userRouter");
const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/user", userRouter);

app.get("/query", (req, res) => {
  res.json(req.query);
});

app.listen(3000, () => {
  console.log("server start!");
});

module.exports = app;
