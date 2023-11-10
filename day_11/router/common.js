const express = require("express");
const router = express.Router();
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const db = require("../model/db");

router.get("/users/:id", (req, res) => {
  db.users.findOne({ id: req.params.id }).then((result) => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  let data = req.body;

  let salt = genSaltSync();
  let password = hashSync(data.password, salt);

  try {
    db.users.create({ ...data, password: password }).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/login/authenticate", (req, res) => {
  res.json(
    compareSync(
      req.body.password,
      "$2b$10$xcZint0VeX8Yoyu3GQyho.C/Tx/swwXz49UHP9vkjl5fs49V8LZHq"
    )
  );
});

router.delete("/id/:id", async (req, res) => {});

module.exports = router;
