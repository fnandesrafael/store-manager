const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const Product = require('../../../database/models/Product');
const productService = require('../../../services/productService');
const { newProductMock, newProductPayload } = require('../../mocks/Product');

describe('02 - Testa a service productService', () => {
  describe('quando é criado um novo produto', () => {
    describe('e o corpo da requisição é inválido', () => {
      before(() => {
        sinon.stub(Product, 'createProduct').returns(newProductMock)
      });

      after(() => {
        sinon.restore();
      });
      
      it('é disparado um erro de validação Joi', async () => {
        try {
          await productService.createProduct({})
        } catch (err) {
          
          expect(err.isJoi).to.be.true
        }
      });
    })

    describe('e o corpo da requisição é válido', () => {
      before(() => {
        sinon.stub(Product, 'createProduct').returns(newProductMock)
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto', async () => {
        const sut = await productService.createProduct(newProductPayload)

        expect(sut).to.be.an('object')
      });

      it('o objeto retornado possui as mesmas chaves da requisição, além de uma chave "id"',
      async () => {
        const sut = await productService.createProduct(newProductPayload)

        expect(sut).to.have.all.keys('id', 'name', 'quantity')
      });
    });
  });
});