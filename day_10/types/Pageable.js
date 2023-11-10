const Sort = require("./Sort");

class Page {
  #pageNo;
  #pageSize;
  constructor(pageNo, pageSize) {
    this.#pageNo = parseInt(pageNo);
    this.#pageSize = parseInt(pageSize);
  }

  get pageNo() {
    return this.#pageNo;
  }

  get pageSize() {
    return this.#pageSize;
  }

  set pageNo(value = 0) {
    this.#pageNo = value;
  }

  set pageSize(value = 0) {
    this.#pageSize = value;
  }

  get hasNext() {
    return this.#pageNo < this.totalPages;
  }

  get hasPrevious() {
    return this.#pageNo > 1;
  }

  get nextPageNo() {
    return this.hasNext ? this.#pageNo + 1 : this.#pageNo;
  }

  get previousPageNo() {
    return this.hasPrevious ? this.#pageNo - 1 : this.#pageNo;
  }

  get offset() {
    return `${(this.#pageNo - 1) * this.#pageSize}`;
  }

  get limit() {
    return `${this.#pageNo * this.#pageSize}`;
  }
}
class PageRequest extends Page {
  #sort;
  constructor(pageNo, pageSize, sort) {
    super(pageNo, pageSize);
    if (sort instanceof Sort) {
      // 정렬 타입 체크
      this.#sort = [sort];
    } else if (sort instanceof Array) {
      // 정렬 타입 체크
      const filteredSort = sort.filter((s) => s instanceof Sort);
      if (filteredSort.length === 0) {
        this.#sort = [Sort.default];
      } else {
        // 중복 체크
        const sets = new Set(filteredSort.map((s) => s.target));
        if (sets.size !== filteredSort.length) {
          throw new Error("sort target is duplicated");
        } else {
          this.#sort = filteredSort;
        }
      }
    } else {
      this.#sort = [Sort.default];
    }
  }

  get orderBy() {
    return this.#sort.flatMap((a) => `${a.target} ${a.direction}`);
  }
}

class PageResponse extends Page {
  #content;
  #totalCount;
  constructor(pageNo, pageSize, totalCount, content = []) {
    super(pageNo, pageSize);
    this.#totalCount = totalCount;
    this.#content = content;
  }
  get totalCount() {
    return this.#totalCount;
  }

  get content() {
    return this.#content;
  }

  set totalCount(value = 0) {
    this.#totalCount = value;
  }

  get totalPages() {
    return Math.ceil(this.#totalCount / this.pageSize);
  }

  set content(value = []) {
    this.#content = value;
  }
  toJSON() {
    return {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      totalCount: this.totalCount,
      totalPages: this.totalPages,
      hasNext: this.hasNext,
      hasPrevious: this.hasPrevious,
      nextPageNo: this.nextPageNo,
      previousPageNo: this.previousPageNo,
      content: this.content,
    };
  }
}

module.exports = { Page, PageRequest, PageResponse };
