const connection = require("./connection");
const Member = require("../types/Member");

async function findOne(email) {
  return new Promise((resolve, reject) =>
    connection((conn) => {
      conn
        .execute("SELECT * FROM member WHERE email=?", [email])
        .then(([[member]]) => {
          if (member) {
            resolve(new Member(member));
          } else {
            reject();
          }
        })
        .catch((e) => {
          reject(e);
        });
    })
  );
}

function findAll() {
  return new Promise((resolve, reject) => {
    resolve([]);
  });
}

async function save(member) {
  const result = await findOne(member.email)
    .then(async (dbMember) => {
      member.password = dbMember.password;
      return await update(member);
    })
    .catch(async (err) => {
      if (!err) {
        return await insert(member);
      }
    });
  return result;
}

async function update(member) {
  return new Promise((resolve, reject) => {
    connection(async (conn) => {
      let query =
        "UPDATE member SET nickname = ?,password = ?, phoneNumber = ? WHERE email = ?";
      const result = await conn
        .execute(query, [
          member.nickname,
          member.password,
          member.phoneNumber,
          member.email,
        ])
        .catch(reject);
      resolve(result);
    });
  });
}

async function insert(member) {
  return new Promise((resolve, reject) => {
    connection(async (conn) => {
      let query =
        "INSERT INTO member (`email`,`nickname`,`password`,`phoneNumber`) VALUES(?,?,?,?)";
      const result = await conn
        .execute(query, [
          member.email,
          member.nickname,
          member.password,
          member.phoneNumber,
        ])
        .catch(reject);
      resolve(result);
    });
  });
}

module.exports = {
  findAll,
  findOne,
  save,
};
