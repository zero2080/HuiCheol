const jwt = require("jsonwebtoken");

// 비밀 키 (환경 변수에서 가져오는 것이 좋습니다)
const SECRET_KEY = "your-secret-key";

module.exports = function generateToken(user) {
  return jwt.sign({ data: user }, SECRET_KEY, {
    expiresIn: "1h",
  });
};
