const { expect } = require('chai');
const Sinon = require('sinon');
const salesController = require('../../../controllers/salesController')
const salesService = require('../../../services/salesService')

describe('Testa a Camada Controller getSaleById', () => {
  describe('Quando não há vendas cadastrados com o mesmo Id', () => {
    const res = {}
    const req = {
      params: { sale_id: 7 }
    }
    const resultMoch = []

    beforeEach(() => {
      res.status = Sinon.stub().returns(res)
      res.json = Sinon.stub().returns()

      Sinon.stub(salesService, 'getSaleById').resolves(resultMoch)
    })

    afterEach(() => {
      salesService.getSaleById.restore()
    })

    it('É retornado o método "status" passando o código 404', async () => {
      await salesController.getSaleById(req, res)

      expect(res.status.calledWith(404)).to.be.equal(true)
    })

    it('É retornado o método "json" contendo a chave "message" e o valor "Sale not found"', async () => {
      await salesController.getSaleById(req, res)

      expect(res.json.calledWith(Sinon.match.has("message", 'Sale not found'))).to.be.equal(true)
    })
  })

  describe('Quando existem vendas registrados no banco de dados com o mesmo Id', () => {
    const res = {}
    const req = {
      params: { sale_id: 7 }
    }
    const resultMoch = [{
      date: "7777-77-77777:77:77.7777",
      sale_id: 7,
      productId: 7,
      quantity: 7
    }]
    
    beforeEach(() => {
      res.status = Sinon.stub().returns(res)
      res.json = Sinon.stub().returns()

      Sinon.stub(salesService, 'getSaleById').resolves(resultMoch)
    })

    afterEach(() => {
      salesService.getSaleById.restore()
    })

    it('É retornado o método "status" passando o código 200', async () => {
      await salesController.getSaleById(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
})