const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const repository = [{ title: "기본데이터", content: "기본 내용" }];

app.get("/", (req, res) => {
  const pageable = req.query;
  console.log(pageable);
  res.send(repository);
});

// http://localhost:3000/123123
app.get("/:hahaha", (req, res) => {
  const id = parseInt(req.params.hahaha);
  const board = repository[id];
  if (board) {
    res.json(board);
  } else {
    res.status(404).send();
  }
});

app.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  repository.push(body);
  res.status(201).send();
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  repository[id] = undefined;
  console.log(repository);
  res.send();
});

app.listen(3000, () => {
  console.log("listenling port : 3000");
});
