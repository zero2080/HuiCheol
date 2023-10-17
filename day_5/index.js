const deepCopy = require("./deepCopy");

const member = { id: 1, email: "dino@robotry.co.kr", nickname: "하하" };
const board = {
  title: "하하",
  writer: member,
  content: "글내용",
  created_at: new Date(),
};

const shellowBoard = { ...board };
const deepBoard = deepCopy(board);

console.log("============ change nickname ==============");
member.nickname = "바보";

console.log("\n============ shellow board ==============");
console.log(shellowBoard);
console.log("\n============ deep board ==============");
console.log(deepBoard);
