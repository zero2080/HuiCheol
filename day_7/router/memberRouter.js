const express = require("express");
const memberRouter = express.Router();
const Member = require("../types/Member");

const repository = require("../repository/member");
const { authFilter } = require("../middleware/authenticator");

memberRouter.post("/login", authFilter, (req, res) => {});

memberRouter.post("/", (req, res) => {
  const { body } = req;
  try {
    const member = new Member(body);
    repository.save(member);
    res.status(201).json({ ...body, password: undefined });
  } catch (e) {
    res
      .status(500)
      .send({ code: "500", message: "가입중 오류가 발생했습니다." });
  }
});

module.exports = memberRouter;
