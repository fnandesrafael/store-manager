const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon')
const connection = require('../../../database/connection')
const { newProductMock, allProductsMock } = require('../../mocks/Product');
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

  describe('quando são buscados todos os produtos com sucesso', () => {
    before(() => {
      sinon.stub(connection, 'query')
        .onCall(0).resolves([allProductsMock])
        .onCall(1).resolves([allProductsMock])
        .onCall(2).resolves([[]])
    });

    after(() => {
      sinon.restore;
    });

    describe('e existem cadastros no banco de dados', () => {
      it('é retornado um array de objetos', async () => {
        const sut = await Product.getProducts()

        expect(sut).to.be.an('array')
        expect(sut[0]).to.be.an('object')
      });
  
      it('os objetos contém as chaves: "id", "name" e "quantity"', async () => {
        const sut = await Product.getProducts()

        expect(sut[0]).to.have.all.keys('id', 'name', 'quantity')
      });
    });

    describe('e não existem cadastros no banco de dados', () => {
      it('é retornado um array vazio', async () => {
        const sut = await Product.getProducts()

        expect(sut).to.be.an('array')
        expect(sut).to.be.empty
      });
    });
  });
});