const mysql = require("mysql2/promise");
let pool = mysql.createPool({
  host: "localhost",
  user: "moon",
  password: "moon",
  database: "moon",
});

module.exports = function (callback) {
  pool.getConnection().then((conn) => {
    callback(conn);
  });
};
