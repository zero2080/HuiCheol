const express = require("express");
const User = require("./models/users.model");
const { passport, authFilter } = require("./config/passport");
const cookieSession = require("cookie-session");
const path = require("path");
const { default: mongoose } = require("mongoose");

const app = express();
require("dotenv").config();

app.use(
  cookieSession({
    name: "cookie-session-name",
    keys: ["secret_key"],
  })
);

app.use(function (req, _, next) {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }

  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//zero2080
//4NbD8SSMrmnCjPYU

app.use("/static", express.static(path.join(__dirname, "public")));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.post("/login", authFilter, (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: "success" });
  } else {
    res.status(401).json({ message: "fail" });
  }
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  // 컬렉션에 저장
  try {
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (e) {
    return res.status(400).json({ message: "fail" });
  }
});

app.listen(3000, () => {
  console.log("Server is start : PORT NUMBER : 3000");
});
