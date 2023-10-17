const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const leaderBoard = [];

app.get("/:att", (req, res) => {
  const { att } = req.params;

  versus(att, random()).then((result) => {
    // {resource : '승리 or 패배 or 비김' }
    console.log(result);
    console.log("-===-");
    // res.status(200).json({ resource: result });
    res.status(200).json({ resource: result });
  });
});

function versus(param, def) {
  let att;
  switch (param) {
    case "가위":
      att = 0;
      break;
    case "바위":
      att = 1;
      break;
    case "보":
      att = 2;
      break;
  }
  console.log(param, def === 0 ? "가위" : def === 1 ? "바위" : "보");

  return new Promise((resolve, reject) => {
    if (
      (att === 0 && def === 0) ||
      (att === 1 && def === 1) ||
      (att === 2 && def === 2)
    ) {
      resolve("비김");
    }

    if (
      (att === 0 && def === 1) ||
      (att === 1 && def === 2) ||
      (att === 2 && def === 0)
    ) {
      resolve("패배");
    }

    if (
      (att === 0 && def === 2) ||
      (att === 1 && def === 0) ||
      (att === 2 && def === 1)
    ) {
      resolve("승리");
    }
  });
}

//0:가위  1:바위  2:보
function random() {
  return Math.round(Math.random() * 10) % 3;
}

app.listen(3000, () => {
  console.log("start server port: 3000");
});
