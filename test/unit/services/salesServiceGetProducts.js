const { expect } = require('chai');
const Sinon = require('sinon');
const salesService = require('../../../services/salesService')
const salesModel = require('../../../models/salesModel')

describe('Testa a Camada Service getSales', () => {
  describe('Quando não há produtos cadastrados', () => {
    beforeEach(() => {
      const result = []

      Sinon.stub(salesModel, 'getSales')
        .resolves(result)
    })

    afterEach(() => {
      salesModel.getSales.restore();
    })
    
    it('Retorna um array', async () => {
      const response = await salesService.getSales()

      expect(response).to.be.an('array');
    })

    it('O array retornado é vazio', async () => {
      const response = await salesService.getSales()

      expect(response).to.be.empty;
    })

  })

  describe('Quando existem produtos registrados no banco de dados "StoreManager.products', () => {
    beforeEach(() => {
      const result = [{
        date: "7777-77-77777:77:77.7777",
        saleId: 7,
        productId: 7,
        quantity: 7
      }]

      Sinon.stub(salesModel, 'getSales')
        .resolves(result)
    })

    afterEach(() => {
      salesModel.getSales.restore();
    })
  
    it('Retorna um array', async () => {
      const response = await salesService.getSales()

      expect(response).to.be.an('array');
    })

    it('O array retornado não está vazio', async () => {
      const response = await salesService.getSales()

      expect(response).to.not.be.empty;
    })

    it('Retorna um array de objetos', async () => {
      const [response] = await salesService.getSales()

      expect(response).to.be.an('object');
    })

    it('Os objetos possuem as chaves date, saleId, productId e quantity', async () => {
      const [response] = await salesModel.getSales()

      expect(response).to.be.includes.all.keys('date', 'saleId', 'productID', 'quantity')
    })

  })
})