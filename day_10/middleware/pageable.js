const { Page, PageRequest, PageResponse } = require("../types/Pageable");
const Sort = require("../types/Sort");

function pageable(req, res, next) {
  //기본 값 설정
  const { pageNo = 1, pageSize = 10, sort } = req.query;

  const pageRequest = new PageRequest(
    pageNo,
    pageSize,
    sort && Array.isArray(sort)
      ? sort.map((s) => new Sort(...s.split(",")))
      : new Sort(...sort.split(","))
  );
  req.pageRequest = pageRequest;
  next();
}

module.exports = pageable;
