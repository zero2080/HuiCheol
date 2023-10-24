const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const body = req.body;

  for (let key in body) {
    console.log(`${key} : ${body[key]}`);
  }
  res.json(JSON.stringify(body));
});

module.exports = router;
