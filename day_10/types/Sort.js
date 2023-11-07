class Sort {
  #target;
  #direction;
  constructor(target, direction) {
    this.#target = target;
    this.#direction = direction.toLowerCase() === "desc" ? "desc" : "asc";
  }

  get orderBy() {
    return `${this.#target} ${this.#direction}`;
  }

  get target() {
    return this.#target;
  }

  static default = new Sort("id", "desc");
}

module.exports = Sort;
