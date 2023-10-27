require("chai");
const app = require("../index");
const request = require("supertest");

// 통합 테스트
describe("통합 테스트", () => {
  describe("GET /query", function () {
    this.name = "dino";
    this.tel = parseInt(Math.random() * 10000).toString();
    // http://localhost:300/query?name=dino&tal=random
    it("json을 리턴한다.", (done) => {
      request(app)
        .get("/query")
        .query(`name=${this.name}`)
        .query(`tel=${this.tel}`)
        .expect("Content-Type", /json/)
        //   .expect("Content-Length", "17")
        .expect(200)
        .end((err, result) => {
          if (err) {
            done(err);
          } else {
            const { name, tel } = result.body;
            name.should.be.equals(this.name);
            tel.should.be.equals(this.tel);

            done();
          }
        });
    });
  });

  describe("회원 기능", () => {
    it("회원 가입 : POST /user", (done) => {
      const body = { name: "gecko", id: "gecko", password: "gecko" };
      request(app)
        .post("/user")
        .send(body)
        .expect(201)
        .end((err) => {
          if (err) {
            done(err);
          }
          done();
        });
    });

    it("로그인 : POST /user/login - 성공", (done) => {
      const body = { id: "testUser", password: "testUser" };
      request(app)
        .post("/user/login")
        .send(body)
        .expect(200)
        .end((err, result) => {
          if (err) {
            console.log(err);
            done(err);
          } else {
            const { resource } = result.body;
            // 키값이 있는지 확인
            resource.should.have.property("accessToken");

            // 길이가 100보다 크거나 같은지 확인
            resource.accessToken.length.should.be.greaterThanOrEqual(100);
            done();
          }
        });
    });

    it("로그인 : POST /user/login - 실패", (done) => {
      const body = { id: "testUser", password: "notMatchedPassword" };
      request(app)
        .post("/user/login")
        .send(body)
        .expect(401)
        .end((err, result) => {
          if (err) {
            done(err);
          }
          const { resource } = result.body;
          resource.should.not.have.property("accessToken");
          done();
        });
    });
  });
});
