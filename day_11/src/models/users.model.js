const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  googleId: {
    type: String,
    unique: true,
  },
});

userSchema.methods.comparePassword = function (plainText, cb) {
  //bcrypt compare 비교

  if (plainText === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  return cb({ error: "error" });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
