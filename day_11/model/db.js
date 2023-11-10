const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_base", "moon", "moon", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  timezone: "+09:00",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
    freezeTableName: true,
  },
});

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  member: sequelize.import(__dirname + "/member.js"),
  // board:sequelize.import(__dirname+"/board.js")
};
