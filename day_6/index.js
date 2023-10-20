const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

const userRepository = [
  {
    id: 1,
    username: "user",
    password: "password",
  },
];

app.use(
  session({
    secret: "my_server",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.use(
  new LocalStrategy(function (username, password, done) {
    const user = userRepository.find((u) => u.username === username);
    if (user && user.password === password) {
      return done(null, user);
    }
    return done(null, false);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = userRepository.find((u) => u.id === id);
  done(null, user);
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

// 홈 라우터
app.get("/", (req, res) => {
  const body = { message: "" };
  if (req.isAuthenticated()) {
    body.message = "Welcome, authenticated user!";
  } else {
    body.message = "You are not authenticated.";
  }
  res.json(body);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
