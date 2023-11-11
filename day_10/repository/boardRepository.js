const Board = require("../model/Board");
const userRepository = require("./userRepository");
const { PageResponse } = require("../types/Pageable");
const conn = require("./connection");

const query = {
  findById: "SELECT * FROM `board` WHERE `id`=?",
  findAll: "SELECT * FROM `board`",
  save: "INSERT INTO `board`(`title`, `content`, `writer`,`updated_at`) VALUES (?,?,?,NOW())",
};

function findById(id) {
  return new Promise((res) => {
    conn.findOne(query.findById, [id]).then((board) => {
      if (board) {
        res(new Board(board));
      } else {
        res();
      }
    });
  });
}

function findAll(pageRequest) {
  let orderBy = "";
  if (pageRequest.orderBy) {
    orderBy = ` ORDER BY ${pageRequest.orderBy.join(",")}`;
  }
  return new Promise((res) => {
    conn
      .execute("SELECT COUNT(*) AS `total_count` FROM `board`")
      .then(([[{ total_count }]]) => {
        console.log("count : ", total_count);
        conn
          .findAll(
            query.findAll + orderBy + " LIMIT ?,?",
            pageRequest ? [pageRequest.offset, pageRequest.limit] : []
          )
          .then((boards) => {
            res(
              new PageResponse(
                pageRequest.pageNo,
                pageRequest.pageSize,
                total_count,
                boards
              )
            );
          });
      });
  });
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
    const dbBoard = conn.find((b) => b.id === board.id);
    if (dbBoard) {
      dbBoard.title = board.title;
      dbBoard.content = board.content;
    }
    return dbBoard;
  } else {
    conn.push(board);
    return board;
  }
}

module.exports = {
  findById,
  findAll,
  save,
};
