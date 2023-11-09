const Board = require("../model/Board");
const userRepository = require("./userRepository");
const { PageResponse } = require("../types/Pageable");

const db = Array.from({ length: 100 }).map(
  (_, idx) =>
    new Board(
      idx,
      `title_${idx}`,
      `content_${idx}`,
      userRepository.findById(idx)
    )
);

function findById(id) {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    return;
  }
  return db[numId];
}

function findAll(pageRequest) {
  return pageRequest
    ? new PageResponse(
        pageRequest.pageNo,
        pageRequest.pageSize,
        db.length,
        db.slice(pageRequest.offset, pageRequest.limit)
      ).toJSON()
    : db;
}

function save(board) {
  if (!board) {
    throw new Error("board is null");
  }

  if (!board.title || !board.content || !board.writer) {
    throw new Error("board is null");
  }

  if (!board instanceof Board) {
    throw new Error("board is not Board");
  }

  if (board.id) {
    const dbBoard = db.find((b) => b.id === board.id);
    if (dbBoard) {
      dbBoard.title = board.title;
      dbBoard.content = board.content;
    }
    return dbBoard;
  } else {
    board.id = db.length;
    db.push(board);
    return board;
  }
}

module.exports = {
  findById,
  findAll,
  save,
};
