const passport = require("passport");
const User = require("../models/users.model");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLocaleLowerCase() })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }

          return done(null, false, { message: "Incorrect password" });
        });
      })
      .catch((err, user) => {
        if (err) return done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser", id);
  User.findById(id).then((user) => {
    done(null, user);
  });
});

function authFilter(req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json(info);
    }
    req.logIn(user, (err) => {
      next(err);
    });
  })(req, res, next);
}

module.exports = { passport, authFilter };
