const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
chai.should();

describe("Server", () => {
  it("should start", (done) => {
    chai
      .request(app)
      .get("/health")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eq("Server is running");
        done();
      });
  });
});