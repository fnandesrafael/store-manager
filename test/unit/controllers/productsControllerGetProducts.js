const { expect } = require('chai');
const Sinon = require('sinon');
const productsController = require('../../../controllers/productsController')
const productsService = require('../../../services/productsService')

describe('Testa a Camada Controller getProducts', () => {
  describe('Quando não há produtos cadastrados', () => {
    const res = {}
    const req = {}

    it('É retornado o método "status" passando o código 200', async () => {
      await productsController.getProducts(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('É retornado o método "json" contendo um array', async () => {
      await productsController.getProducts(req, res)

      expect(res.json.calledWith(Sinon.match.array)).to.be.equal(true)
    })
  })

  describe('Quando existem produtos registrados no banco de dados "StoreManager.products', () => {

  })
})