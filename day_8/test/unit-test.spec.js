// const assert = require("assert");
require("chai");
const sample = require("../service/sampleService");

// 기본 단위 테스트
describe("기본 단위 테스트", () => {
  // describe 함수는 mocha로 실행되기때문에 따로 require하지 않아도 사용 가능한 기본 함수
  describe("# - 단위 테스트 서브 타이틀", () => {
    it("반환된 배열의 길이는 10 보다 커야합니다.", () => {
      // assert는 nodejs에서 기본으로 재공하는 검증용 라이브러리
      // assert.equal(sample().length, 100);

      // should는 mocha에서 권장하는 서드파티 검증 라이브러리.
      (sample().length > 10).should.be.equals(true);
    });
  });

  describe("# - 단위 테스트 서브 타이틀", () => {
    it("실패 케이스.", () => {
      // assert는 nodejs에서 기본으로 재공하는 검증용 라이브러리
      //   assert.equal(sample().length > 10, true);

      // should는 mocha에서 권장하는 서드파티 검증 라이브러리.
      sample().length.should.not.be.equals(9, `\n\t 반환값 - 기대값`);
    });
  });
});
