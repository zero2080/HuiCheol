const router = require("express").Router();
const { authenticator } = require("../middleware/authenticator");

router.post("/authenticate", authenticator);

module.exports = router;
