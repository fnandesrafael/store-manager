const { expect } = require('chai');
const Sinon = require('sinon');
const salesController = require('../../../controllers/salesController')
const salesService = require('../../../services/salesService')

describe('Testa a Camada Controller getSales', () => {
  describe('Quando não há vendas cadastrados', () => {
    const res = {}
    const req = {}

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

  })
})