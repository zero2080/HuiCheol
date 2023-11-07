class User {
  #password;
  constructor(id, username, password, nickname) {
    this._id = id;
    this._username = username;
    this.#password = password;
    this._nickname = nickname;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id() {
    return this._id;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this.#password;
  }

  get nickname() {
    return this._nickname;
  }

  set id(value) {
    this._id = value;
  }

  set username(value) {
    this._username = value;
  }

  set password(value) {
    this._updatedAt = new Date();
    this.#password = value;
  }

  set nickname(value) {
    this._updatedAt = new Date();
    this._nickname = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set updatedAt(value) {
    return;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}

module.exports = User;
