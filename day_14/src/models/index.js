const Sequelize = require("sequelize");

const dbConfig = {
  HOST: "localhost",
  USER: "node_orm",
  PASSWORD: "node_orm",
  PORT: '3306',
  DB: "node_orm",
  dialect: "mysql",
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});

const db = {};
db.sequelize = sequelize;
db.users = require("./users.model.js")(sequelize);

module.exports = db;
