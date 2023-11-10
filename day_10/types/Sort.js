class Sort {
  #target;
  #direction;
  constructor(target, direction) {
    this.#target = target;
    this.#direction = direction.toLowerCase() === "desc" ? "desc" : "asc";
  }

  get direction() {
    return this.#direction;
  }

  get target() {
    return this.#target;
  }

  static default = new Sort("id", "desc");
}

module.exports = Sort;
