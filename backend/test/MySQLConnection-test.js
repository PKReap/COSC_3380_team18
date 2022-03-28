const { expect } = require("chai");
const { validateUser } = require("../src/MySQLConnection");
const { connect, close } = require("../src/connection");

describe("MySQLConnection", () => {
  before(() => {
    connect();
  });

  after(() => {
    close();
  });

  it("validate users should be false when username or password is incorrect", () => {
    validateUser("asdf", "test", "POST", (result) => {
      const { validation } = result;
      expect(validation).to.be.false;
    });
  });

  it("validate users should be true when username and password is correct", () => {
    validateUser("thien", "userpassword", "POST", (result) => {
      const { validation } = result;
      expect(validation).to.be.true;
    });
  });
});
