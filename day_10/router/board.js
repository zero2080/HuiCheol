const router = require("express").Router();
const Board = require("../model/Board");
const { authFilter } = require("../middleware/authenticator");
const pageMiddleware = require("../middleware/pageable");

const boardRepository = require("../repository/boardRepository");

router.get("/", pageMiddleware, async (req, res) => {
  const { pageRequest } = req;
  const result = await boardRepository.findAll(pageRequest);
  res.json(result.toJSON());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await boardRepository.findById(id);
  if (result) {
    res.json(result.toJSON());
  } else {
    res.status(404).end();
  }
});

router.post("/", authFilter, async (req, res) => {
  const { title, content } = req.body;
  const board = new Board(null, null, title, content, req.authorization);

  const result = await boardRepository.save(board);
  res.json(result.toJSON());
});

module.exports = router;
