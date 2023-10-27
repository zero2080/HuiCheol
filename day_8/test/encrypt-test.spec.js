const { encrypt, compare } = require("../util/encryptor");
require("should");

describe("암호화 테스트", () => {
  const plainText = "test";
  const cipherText =
    "$2b$10$OL9ZohKQ430fVRX/1s08p.RjRPAqzuIUaLlV9ZJ/Ga.Hj4oQQm77e"; //testUser

  it("암호화", () => {
    encrypt(plainText).should.be.ok();
  });

  it("검증 통과", () => {
    compare(plainText, cipherText).should.be.equals(true);
  });

  it("검증 실패", () => {
    compare("hahahaha", cipherText).should.be.equals(false);
  });
});
