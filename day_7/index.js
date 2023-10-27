const express = require("express");
const memberRouter = require("./router/memberRouter");
const { passport } = require("./middleware/authenticator");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "my_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./middleware/logger"));
app.use(express.static("public"));
app.use("/member", memberRouter);

app.listen(3000, () => {
  console.log("server start!");
});
