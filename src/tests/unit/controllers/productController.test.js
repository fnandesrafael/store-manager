const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');
const { newProductMock, newProductPayload, allProductsMock, searchedProductMock } = require('../../mocks/Product');

const req = {}
const res = {}

describe('Testa o controller productController', () => {
  describe('quando é criado um novo produto', () => {
    before(() => {
      sinon.stub(productService, 'createProduct').resolves(newProductMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });
    
    it('o método status é chamado com o valor 201', async () => {
      req.body = newProductPayload;
      await productController.createProduct(req, res);

      expect((res.status).calledWith(201)).to.be.true;
    });

    it('o método json é chamado com o objeto criado', async () => {
      req.body = newProductPayload;
      await productController.createProduct(req, res);

      expect((res.json).calledWith(newProductMock)).to.be.true;
    });
  });

  describe('quando são buscados todos os produtos', () => {
    before(() => {
      sinon.stub(productService, 'getProducts').resolves(allProductsMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });
    
    it('o método status é chamado com o valor 200', async () => {
      await productController.getProducts(req, res);

      expect((res.status).calledWith(200)).to.be.true;
    });

    it('o método json é chamado com todos os produtos cadastrados', async () => {
      await productController.getProducts(req, res);

      expect((res.json).calledWith(allProductsMock)).to.be.true;
    });
  });

  describe('quando é buscado um produto em específico', () => {
    before(() => {
      sinon.stub(productService, 'getProductById').resolves(searchedProductMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });
    
    it('o método status é chamado com o valor 200', async () => {
      req.params = { id: 1 };
      await productController.getProductById(req, res);

      expect((res.status).calledWith(200)).to.be.true;
    });

    it('o método json é chamado com o produto pesquisado', async () => {
      req.params = { id: 1 };
      await productController.getProductById(req, res);

      expect((res.json).calledWith(searchedProductMock)).to.be.true;
    });
  });
});