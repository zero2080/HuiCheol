class User {
  //캡슐화
  #name;
  #id;
  #password;

  constructor({ name, id, password }) {
    this.#name = name;
    this.#id = id;
    this.#password = password;
  }

  // setter
  set name(value) {
    this.#name = value;
  }

  // getter
  get name() {
    return this.#name;
  }

  set id(value) {
    this.#id = value;
  }

  get id() {
    return this.#id;
  }

  set password(value) {
    this.#password = value;
  }

  get password() {
    return this.#password;
  }

  toJsonObject() {
    return { id: this.#id, name: this.#name };
  }
}

const repository = new Array(
  new User({
    id: "testUser",
    password: "$2b$10$UZNTE5OerM4bjFZnCVX0SOZagCAsTl9Au3kLffHk.VdIrWWXeRWBq",
    name: "testName",
  })
);

module.exports = repository;
