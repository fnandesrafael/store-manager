const { expect } = require('chai');
const Sinon = require('sinon');
const productsService = require('../../../services/productsService')
const productsModel = require('../../../models/productsModel')

describe('Testa a Camada Service getProducts', () => {
  describe('Quando não há produtos cadastrados', () => {
    beforeEach(() => {
      const result = []

      Sinon.stub(productsModel, 'getProducts')
        .resolves(result)
    })

    afterEach(() => {
      productsModel.getProducts.restore();
    })
    
    it('Retorna um array', async () => {
      const response = await productsService.getProducts()

      expect(response).to.be.an('array');
    })

    it('O array retornado é vazio', async () => {
      const response = await productsService.getProducts()

      expect(response).to.be.empty;
    })

  })

  describe('Quando existem produtos registrados no banco de dados "StoreManager.products', () => {
    beforeEach(() => {
      const result = [{
        id: 7,
        name: 'Nome do Produto',
        quantity: 7
      }]

      Sinon.stub(productsModel, 'getProducts')
        .resolves(result)
    })

    afterEach(() => {
      productsModel.getProducts.restore();
    })
  
    it('Retorna um array', async () => {
      const response = await productsService.getProducts()

      expect(response).to.be.an('array');
    })

    it('O array retornado não está vazio', async () => {
      const response = await productsService.getProducts()

      expect(response).to.not.be.empty;
    })

    it('Retorna um array de objetos', async () => {
      const [response] = await productsService.getProducts()

      expect(response).to.be.an('object');
    })

    it('Os objetos possuem as chaves id, name e quantity', async () => {
      const [response] = await productsModel.getProducts()

      expect(response).to.be.includes.all.keys('id', 'name', 'quantity')
    })

  })
})