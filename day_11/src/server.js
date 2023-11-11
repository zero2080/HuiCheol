const express = require("express");
const User = require("./models/users.model");
const passport = require("./config/passport");
const cookieSession = require("cookie-session");
const path = require("path");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(
  cookieSession({
    name: "cookie-session-name",
    keys: ["secret_key1", "secret_key2"],
  })
);

// app.use(cookieSession({}));

app.use((req, res, next) => {
  if (req.session) {
    if (!req.session.regenerate) {
      req.session.regenerate = (cb) => cb();
    }

    if (!req.session.save) {
      req.session.save = (cb) => cb();
    }
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//zero2080
//4NbD8SSMrmnCjPYU

app.use("/static", express.static(path.join(__dirname, "public")));
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://zero2080:4NbD8SSMrmnCjPYU@cluster0.zq4j480.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.post("/login", (req, res, next) => {
  console.log("login");
  passport.authenticate("local", (err, user, info) => {
    console.log("authenticate");
    if (err) {
      return next(err);
    }
    if (!user) {
      // console.log("not found authenticate");
      return res.status(400).json(info);
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  // 컬렉션에 저장
  try {
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "fail" });
  }
});

app.listen(3000, () => {
  console.log("Server is start : PORT NUMBER : 3000");
});
