const express = require("express");
const authError = require("../error/AuthenticationError");
const repository = require("../repository/member");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const provider = new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    repository
      .findOne(email)
      .then((member) => {
        if (member.password === password) {
          done(null, member);
        } else {
          throw new Error("not matched password");
        }
      })
      .catch((e) => {
        done(null, false);
      });
  }
);

function authFilter(req, res, next) {
  passport.authenticate("local", (error, user) => {
    if (error) next(error);
    if (user) {
      res.status(200).json({ ...user, password: undefined });
    } else {
      res.status(401).json(authError.notAuthorization());
    }
    next();
  })(req, res, next);
}

function serializer(user, done) {
  done(null, user.email);
}

async function deserializer(email, done) {
  const member = await repository
    .findOne(email)
    .catch((e) => done(null, false));
  done(null, member);
}

passport.use(provider);
passport.serializeUser(serializer);
passport.deserializeUser(deserializer);

module.exports = { passport, authFilter };
