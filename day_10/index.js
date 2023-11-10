const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const login = require("./router/login");
const boardRouter = require("./router/board");
const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/login", login);
app.use("/board", boardRouter);

app.listen(port, () => {
  console.log(`Server is start : PORT NUMBER : ${port}`);
});
