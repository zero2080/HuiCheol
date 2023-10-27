const router = require("express").Router();

router.post("/", (req, res) => {
  res.status(201).send();
});

module.exports = router;
