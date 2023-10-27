const router = require("express").Router();
const { encrypt, compare } = require("../util/encryptor");
const repository = require("../model/User");
const generateToken = require("../util/tokenGenerator");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(repository.filter((u) => u.id === id)[0]);
});

router.post("/", (req, res) => {
  const body = req.body;
  body.password = encrypt(body.password);

  repository.push(body);

  res.status(201).send();
});

router.post("/login", async (req, res) => {
  const { body } = req;
  const [result] = await repository
    .filter((u) => u.id === body.id)
    .map((u) => {
      if (compare(body.password, u.password)) {
        res.status(200);
        return { resource: { accessToken: generateToken(u.toJsonObject()) } };
      }
    });
  if (!result) {
    res.status(401).json({ resource: { code: "0000", message: "login fail" } });
  }
  res.json(result);
});
module.exports = router;
