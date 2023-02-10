//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe("Books", () => {
  // Consts
  const id = "3",
    numBooks = 5,
    successCode = 200,
    book = {
      name: "hello",
      info: "hello",
      src: "1R5kc5NLUFG2atEPyTPvWwuFQcnLzjlGb",
    },
    testName = "Cannon EOS 80D DSLR Camera",
    testPrice = { title: "hello", src: "1R5kc5NLUFG2atEPyTPvWwuFQcnLzjlGb" };

  /*
   * Test for /GET
   */
  describe("/GET book", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(server)
        .get("/books")
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(numBooks);
          done();
        });
    });
  });
  /*
   * Test for /POST
   */
  describe("/POST book", () => {
    it("it should POST a book ", (done) => {
      chai
        .request(server)
        .post("/books")
        .send(book)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("info");
          res.body.should.have.property("src");
          res.body.should.have.property("id");
          done();
        });
    });
  });
  /*
   * Test for /GET:id
   */
  describe("/GET/:id book", () => {
    it("it should GET a book by the given id", (done) => {
      chai
        .request(server)
        .get(`/books/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(id);
          res.body.should.have.property("info");
          res.body.should.have.property("src");
          res.body.should.have.property("name").eql(testName);
          done();
        });
    });
  });
  /*
   * Test for /PUT:id
   */
  describe("/PUT/:id book", () => {
    it("it should UPDATE a book given the id", (done) => {
      chai
        .request(server)
        .put(`/books/${id}`)
        .send(testPrice)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(id);
          res.body.should.have.property("name").eql(testName);
          res.body.should.have.property("info");
          res.body.should.have.property("src").eql(testPrice.src);
          done();
        });
    });
  });
  /*
   * Test for /DELETE:id
   */
  describe("/DELETE/:id book", () => {
    it("it should DELETE a book given the id", (done) => {
      chai
        .request(server)
        .delete(`/books/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql(`Book ${id} removed`);
          done();
        });
    });
  });
});
