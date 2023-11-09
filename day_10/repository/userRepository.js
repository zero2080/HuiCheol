const password = require("bcrypt").hash("test", 12);
const User = require("../model/User");

const db = Array.from({ length: 100 }).map(
  (_, idx) => new User(idx, `test_${idx}`, password, `test_${idx}`)
);

function findByUsername(username) {
  return db.find((u) => u.username === username);
}

function findById(id) {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    return;
  }
  return db[numId];
}

function findAll(pageRequest) {
  return pageRequest ? db.slice(pageRequest.offset, pageRequest.limit) : db;
}

function save(user) {
  if (!user) {
    throw new Error("user is null");
  }

  if (!user instanceof User) {
    throw new Error("user is not User");
  }

  const dbUser = db.find((u) => u.username === user.username);
  if (dbUser) {
    dbUser.nickname = user.nickname;
  } else {
    user.id = db.length;
    db.push(user);
  }
}

module.exports = {
  findByUsername,
  findById,
  findAll,
  save,
};
