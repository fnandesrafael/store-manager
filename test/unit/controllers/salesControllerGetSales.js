const { expect } = require('chai');
const Sinon = require('sinon');
const salesController = require('../../../controllers/salesController')
const salesService = require('../../../services/salesService')

describe('Testa a Camada Controller getSales', () => {
  describe('Quando não há vendas cadastrados', () => {
    const res = {}
    const req = {}

    beforeEach(() => {
      res.status = Sinon.stub().returns(res)
      res.json = Sinon.stub().returns()

      Sinon.stub(salesService, 'getSales').resolves([])
    })

    afterEach(() => {
      salesService.getSales.restore()
    })

    it('É retornado o método "status" passando o código 200', async () => {
      await salesController.getSales(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('É retornado o método "json" contendo um array', async () => {
      await salesController.getSales(req, res)

      expect(res.json.calledWith(Sinon.match.array)).to.be.equal(true)
    })
  })

  describe('Quando existem vendas registrados no banco de dados "StoreManager.products', () => {
    const res = {}
    const req = {}
    const salesMoch = [{
      date: "7777-77-77777:77:77.7777",
      saleId: 7,
      productId: 7,
      quantity: 7
    }]

    beforeEach(() => {
      res.status = Sinon.stub().returns(res)
      res.json = Sinon.stub().returns()

      Sinon.stub(salesService, 'getSales').resolves(salesMoch)
    })

    afterEach(() => {
      salesService.getSales.restore()
    })

    it('É retornado o método "status" passando o código 200', async () => {
      await salesController.getSales(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('É retornado o método "json" contendo um array', async () => {
      await salesController.getSales(req, res)

      expect(res.json.calledWith(Sinon.match.array)).to.be.equal(true)
    })

    it('É retornado o método "json" contendo um array de objetos', async () => {
      await salesController.getSales(req, res)

      expect(res.json.calledWith(Sinon.match.array.deepEquals(salesMoch))).to.be.equal(true)
    })
  })
})