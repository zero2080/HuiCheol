const bcrypt = require("bcrypt");

const sartRound = 10;

function genSart() {
  return bcrypt.genSaltSync(sartRound);
}

function encrypt(plainText) {
  return bcrypt.hashSync(plainText, genSart());
}

function compare(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = { encrypt, compare };
