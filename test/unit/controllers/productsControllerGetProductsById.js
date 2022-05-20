const { expect } = require('chai');
const Sinon = require('sinon');
const productsController = require('../../../controllers/productsController')
const productsService = require('../../../services/productsService')

describe('Testa a Camada Controller getProductById', () => {
  describe('Quando não há produtos cadastrados com o mesmo Id', () => {
    const res = {}
    const req = {
      params: { id: 7 }
    }
    const resultMoch = []

    beforeEach(() => {
      res.status = Sinon.stub().returns(res)
      res.json = Sinon.stub().returns()

      Sinon.stub(productsService, 'getProductById').resolves(resultMoch)
    })

    afterEach(() => {
      productsService.getProductById.restore()
    })

    it('É retornado o método "status" passando o código 404', async () => {
      await productsController.getProductById(req, res)

      expect(res.status.calledWith(404)).to.be.equal(true)
    })

    it('É retornado o método "json" contendo a chave "message" e o valor "Product not found"', async () => {
      await productsController.getProductById(req, res)

      expect(res.json.calledWith(Sinon.match.has("message", 'Product not found'))).to.be.equal(true)
    })
  })

  describe('Quando existem produtos registrados no banco de dados com o mesmo Id', () => {
    const res = {}
    const req = {
      params: { id: 7 }
    }
    const resultMoch = [{
      id: 7,
      name: 'Nome do produto',
      quantity: 7
    }]
    
    beforeEach(() => {
      res.status = Sinon.stub().returns(res)
      res.json = Sinon.stub().returns()

      Sinon.stub(productsService, 'getProductById').resolves(resultMoch)
    })

    afterEach(() => {
      productsService.getProductById.restore()
    })

    it('É retornado o método "status" passando o código 200', async () => {
      await productsController.getProductById(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true)
    })
  })
})