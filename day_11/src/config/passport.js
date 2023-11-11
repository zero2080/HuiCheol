const passport = require("passport");
const User = require("../models/users.model");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      console.log(email, password);
      User.findOne({ email: email.toLocaleLowerCase() }, (err, user) => {
        if (err) return done(err);
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
      });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser");
  User.findById(id).then((user) => {
    done(null, user);
  });
});

module.exports = passport;
