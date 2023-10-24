const express = require("express");
const memberRouter = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Member = require("../types/Member");
const authError = require("../error/AuthenticationError");

const repository = {
  "zero2080@naver.com": new Member({
    email: "zero2080@naver.com",
    password: "1234",
    phoneNumber: "01012341234",
    nickname: "크크크킄",
  }),
};

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (id, password, done) {
    const email = Object.keys(repository).find((key) => key === id);
    if (email && repository[email].password === password) {
      return done(null, repository[email]);
    }
    return done(null, false);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((username, done) => {
  const user =
    repository[Object.keys(repository).find((key) => key === username)];
  done(null, user);
});

memberRouter.post("/login", (req, res, next) => {
  if (req.header("Content-Type") !== "application/json") {
    res.status(415).json(authError.notSupportedContentType());
  } else {
    passport.authenticate("local", (error, user) => {
      if (error) next(error);
      if (user) {
        res.status(200).json({ ...user, password: undefined });
      } else {
        res.status(401).json(authError.notAuthorization());
      }
    })(req, res, next);
  }
});

memberRouter.post("/", (req, res) => {
  const { body } = req;
  try {
    const member = new Member(body);
    repository[member.email] = member;
    res.status(201).json({ ...body, password: undefined });
  } catch (e) {
    res
      .status(500)
      .send({ code: "500", message: "가입중 오류가 발생했습니다." });
  }
});

module.exports = { memberRouter, passport };
