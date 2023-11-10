const express = require("express");
const db = require("./model/db");
const common = require("./router/common");
const app = express();

const port = 3000;

app.use(express.json());

app.use("/", common);

app.listen(port, () => {
  db.sequelize.sync({ force: true });
  console.log(`[SERVER] listen port: ${port}`);
});
