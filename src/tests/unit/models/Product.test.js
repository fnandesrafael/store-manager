const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon')
const connection = require('../../../database/connection')
const { newProductMock } = require('../../mocks/Product');
const Product = require('../../../database/models/Product')

describe('Testa a model Product', () => {
  describe('quando é criado um novo produto com sucesso', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([{ insertId: 0 }, undefined])
    })
  
    after(() => {
      sinon.restore();
    })
    
    it('é retornado um objeto', async () => {
      const sut = await Product.createProduct(newProductMock)

      expect(sut).to.be.an('object')
    });

    it('o objeto contém as chaves: "id", "name", e "quantity"', async () => {
      const sut = await Product.createProduct(newProductMock)

      expect(sut).to.have.all.keys('id', 'name', 'quantity')
    });
  });
});