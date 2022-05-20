const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection')
const productsModel = require('../../../models/productsModel')

describe('Testa se a Model getProducts realiza uma busca no BD "StoreManager.products" com sucesso',() => {
  describe('Quando não há produtos cadastrados', () => {
    beforeEach(() => {
      const queryResult = [[]]

      Sinon.stub(connection, 'query')
        .resolves(queryResult)
    })

    afterEach(() => {
      connection.query.restore();
    })
    
    it('Retorna um array', async () => {
      const response = await productsModel.getProducts()

      expect(response).to.be.an('array');
    })

    it('O array retornado é vazio', async () => {
      const response = await productsModel.getProducts()

      expect(response).to.be.empty;
    })

  })
  
  describe('Quando existem produtos registrados no banco de dados "StoreManager.products"', () => {
    beforeEach(() => {
      const queryResult = [[{
        id: 7,
        name: 'Nome do Produto',
        quantity: 7
      }]]

      Sinon.stub(connection, 'query')
        .resolves(queryResult)
    })

    afterEach(() => {
      connection.query.restore();
    })

    it('Retorna um array', async () => {
      const response = await productsModel.getProducts()

      expect(response).to.be.an('array');
    })

    it('O array retornado não está vazio', async () => {
      const response = await productsModel.getProducts()

      expect(response).to.not.be.empty;
    })

    it('O array é um array de objetos', async () => {
      const [response] = await productsModel.getProducts()

      expect(response).to.be.an('object');
    })

    it('Os objetos no array possuem as chaves id, name e quantity', async () => {
      const [response] = await productsModel.getProducts()

      expect(response).to.be.includes.all.keys('id', 'name', 'quantity')
    })
  })
})
