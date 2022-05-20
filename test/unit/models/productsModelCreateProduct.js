const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../models/connection");
const productsModel = require("../../../models/productsModel");

describe("Insere um novo produto no banco de dados", () => {
  const payloadProduct = {
    id: 7,
    name: "Nome do produto",
    quantity: 7,
  };

  before(async () => {
    const response = [{ insertId: 7 }];

    sinon.stub(connection, "query").resolves(response);
  });

  after(async () => {
    connection.query.restore();
  });

  describe("quando é inserido com sucesso", async () => {
    it("retorna um objeto", async () => {
      const response = await productsModel.createProduct(payloadProduct);

      expect(response).to.be.an("array");
    });
  });
});