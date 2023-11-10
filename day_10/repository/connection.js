const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  user: "moon",
  password: "moon",
  database: "moon",
});

async function executeQuery(callback) {
  const conn = await pool.getConnection();
  return await callback(conn);
}

module.exports = {
  findOne: (query, params) => {
    console.log("FIND_ONE : ", query, params);
    return executeQuery(async (conn) => {
      const [rows] = await conn.execute(query, params);
      return rows[0];
    });
  },
  findAll: async (query, params) => {
    console.log("FIND_ALL : ", query, params);

    return await executeQuery(async (conn) => {
      const [rows] = await conn.execute(query, params);
      return rows;
    });
  },
  execute: async (query, params) => {
    console.log("EXECUTE : ", query, params);

    return await executeQuery(async (conn) => {
      return await conn.execute(query, params);
    });
  },
};
