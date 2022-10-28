const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const saleController = require("../../../controllers/saleController");
const saleService = require('../../../services/saleService');
const { newSaleMock, newSalePayload, allSalesMock, searchedSaleMock } = require('../../mocks/Sale');

const req = {}
const res = {}

describe('Testa o controller saleController', () => {
  describe('quando é criada uma nova venda', () => {
    before(() => {
      sinon.stub(saleService, 'createSale').resolves(newSaleMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });
    
    it('o método status é chamado com o valor 201', async () => {
      req.body = newSalePayload;
      await saleController.createSale(req, res);

      expect((res.status).calledWith(201)).to.be.true;
    });

    it('o método json é chamado com o objeto criado', async () => {
      req.body = newSalePayload;
      await saleController.createSale(req, res);

      expect((res.json).calledWith(newSaleMock)).to.be.true;
    });
  });

  describe('quando são pesquisadas todas as vendas', () => {
    before(() => {
      sinon.stub(saleService, 'getSales').resolves(allSalesMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });
    
    it('o método status é chamado com o valor 200', async () => {
      await saleController.getSales(req, res);

      expect((res.status).calledWith(200)).to.be.true;
    });

    it('o método json é chamado com o objeto criado', async () => {
      await saleController.getSales(req, res);

      expect((res.json).calledWith(allSalesMock)).to.be.true;
    });
  });

  describe('quando é pesquisada uma venda específica', () => {
    before(() => {
      sinon.stub(saleService, 'getSaleById').resolves(searchedSaleMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });
    
    it('o método status é chamado com o valor 200', async () => {
      req.params = { id: 1 }
      await saleController.getSaleById(req, res);

      expect((res.status).calledWith(200)).to.be.true;
    });

    it('o método json é chamado com o objeto criado', async () => {
      req.params = { id: 1 }
      await saleController.getSaleById(req, res);

      expect((res.json).calledWith(searchedSaleMock)).to.be.true;
    });
  });
});