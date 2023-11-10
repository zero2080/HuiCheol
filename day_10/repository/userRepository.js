const User = require("../model/User");

const conn = require("./connection");

const query = {
  findByUsername: "SELECT * FROM `member` WHERE `username`=?",
  findById: "SELECT * FROM `member` WHERE `id`=?",
  findAll: "SELECT * FROM `member` LIMIT ?,?",
  update: "UPDATE `member` SET `password`=?,`nickname`=? WHERE `id`=?",
  save: "INSERT INTO `member`(`username`, `password`, `nickname`) VALUES (?,?,?)",
};

function findByUsername(username) {
  return new Promise((res) => {
    conn.findOne(query.findByUsername, [username]).then((user) => {
      if (user) {
        res(new User(user));
      } else {
        res();
      }
    });
  });
}

async function findById(id) {
  let user = await conn.findOne(query.findById, [id]);
  if (user) {
    return new User(user);
  } else {
    return;
  }
}

function findAll(pageRequest) {
  // return pageRequest ? db.slice(pageRequest.offset, pageRequest.limit) : db;
  return conn.findAll(
    query.findAll,
    pageRequest ? [pageRequest.offset, pageRequest.limit] : []
  );
}

async function save(user) {
  if (!user) {
    throw new Error("user is null");
  }

  if (!user instanceof User) {
    throw new Error("user is not User");
  }

  let dbUser = await findByUsername(user.username).then((db) => {
    db.nickname = user.nickname;
    return db;
  });

  if (!dbUser) {
    dbUser = user;
    conn.execute(query.update, []);
  }
}

module.exports = {
  findByUsername,
  findById,
  findAll,
  save,
};
