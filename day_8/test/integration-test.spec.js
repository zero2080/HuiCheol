require("should");
const app = require("../index");
const request = require("supertest");

// 통합 테스트
describe("통합 테스트", () => {
  describe("GET /query", function () {
    this.name = "dino";
    this.tel = parseInt(Math.random() * 10000).toString();

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

  describe("POST /user", () => {
    const body = { name: "gecko" };
    it("HttpStatus- 201", (done) => {
      request(app)
        .post("/user")
        .send(body)
        .expect(201)
        .end((err, result) => {
          // console.log(result);

          if (err) {
            console.log(err);
            done(err);
          }
          done();
        });
    });
  });
});
