const router = require("express").Router();
const Board = require("../model/Board");
const { authFilter } = require("../middleware/authenticator");
const pageMiddleware = require("../middleware/pageable");

const boardRepository = require("../repository/boardRepository");

router.get("/", pageMiddleware, (req, res) => {
  const { pageRequest } = req;
  const result = boardRepository.findAll(pageRequest);
  res.json(result);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = boardRepository.findById(id);
  if (result) {
    res.json(result.toJSON());
  } else {
    res.status(404).end();
  }
});

router.post("/", authFilter, (req, res) => {
  const { title, content } = req.body;
  const board = new Board(null, title, content, req.authorization);

  const result = boardRepository.save(board);
  res.json(result.toJSON());
});

module.exports = router;
