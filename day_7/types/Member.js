module.exports = class Member {
  constructor({ email, password, nickname, phoneNumber }) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
  }
};
