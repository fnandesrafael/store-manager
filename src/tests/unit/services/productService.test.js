const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const Product = require('../../../database/models/Product');
const productService = require('../../../services/productService');
const { newProductMock } = require('../../mocks/Product');

describe('Testa a camada productService', () => {
  describe('quando é criado um novo produto', () => {
    describe('e o corpo da requisição é inválido', () => {
      before(() => {
        sinon.stub(Product, 'createProduct').returns(newProductMock)
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto, com as chaves: "statusCode" e "message"', async () => {
        const sut = await productService.createProduct({})

        expect(sut).to.be.an('object')
        expect(sut).to.have.all.keys('statusCode', 'message')
      });

      it('a chave "statusCode" possui o valor 400', async () => {
        const sut = await productService.createProduct({})

        expect(sut.statusCode).to.be.equal(400)
      });
    })

    describe('e o corpo da requisição é válido', () => {
      before(() => {
        sinon.stub(Product, 'createProduct').returns(newProductMock)
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto, com as chaves: "statusCode" e "message"', async () => {
        const sut = await productService.createProduct({})

        expect(sut).to.be.an('object')
        expect(sut).to.have.all.keys('statusCode', 'message')
      });

      it('a chave "statusCode" possui o valor 201', async () => {
        const sut = await productService.createProduct({ name: 'Martelo de Thor', quantity: 10 })

        expect(sut.statusCode).to.be.equal(201)
      });
    })
  });
});