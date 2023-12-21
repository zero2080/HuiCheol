const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 4,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

userSchema.methods.comparePassword = function (plainText, cb) {
  //bcrypt compare 비교
  console.log(plainText, this.password);

  if (plainText === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
