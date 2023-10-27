module.exports = class Member {
  constructor({ email, password, nickname, phoneNumber }) {
    this._email = email;
    this._password = password;
    this._nickname = nickname;
    this._phoneNumber = phoneNumber;
  }

  get schema() {
    return "member";
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  get nickname() {
    return this._nickname;
  }

  set nickname(value) {
    this._nickname = value;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  set phoneNumber(value) {
    this._phoneNumber = value;
  }
};
