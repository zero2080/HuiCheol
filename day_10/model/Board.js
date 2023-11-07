class Board {
  #id;
  #title;
  #content;
  #writer;
  #createdAt;
  #updatedAt;
  constructor(id, title, content, writer) {
    this.#id = id;
    this.#title = title;
    this.#content = content;
    this.#writer = writer;
    this.#createdAt = new Date();
    this.#updatedAt = new Date();
  }

  set id(value) {
    this.#id = value;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    this.#updatedAt = new Date();
    this.#title = value;
  }

  get content() {
    return this.#content;
  }

  set content(value) {
    this.#updatedAt = new Date();
    this.#content = value;
  }

  get writer() {
    return this.#writer;
  }

  set writer(value) {}

  get createdAt() {
    return this.#createdAt;
  }

  set createdAt(value) {}

  get updatedAt() {
    return this.#updatedAt;
  }

  set updatedAt(value) {
    this.#updatedAt = value;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      content: this.#content,
      writer: this.#writer,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}

module.exports = Board;
