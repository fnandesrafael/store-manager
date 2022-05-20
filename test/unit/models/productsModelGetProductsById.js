const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection')
const productsModel = require('../../../models/productsModel')

describe('Testa se a Model getProductsById realiza uma busca no BD "StoreManager.products" com sucesso ', () => {
  describe('Quando não há um produto com o Id passado nos parâmetros', () => {
    beforeEach(() => {
      const queryResult = [[]]

      Sinon.stub(connection, 'query')
        .resolves(queryResult)
    })

    afterEach(() => {
      connection.query.restore();
    })

    it('Retorna um array', async () => {
      const response = await productsModel.getProductById(7)

      expect(response).to.be.an('array')
    })

    it('Retorna um array vazio', async () => {
      const response = await productsModel.getProductById(7)

      expect(response).to.be.empty
    })
  })

  describe('Quando há um produto com o Id passado nos parâmetros', () => {
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
      const response = await productsModel.getProductById()

      expect(response).to.be.an('array')
    })

    it('O array retornado não está vazio', async () => {
      const response = await productsModel.getProductById()

      expect(response).to.not.be.empty
    })

    it('O array retornado possui um objeto', async () => {
      const [response] = await productsModel.getProductById()

      expect(response).to.be.an('object')
    })

    it('O objeto no array possui as chaves id, name e quantity', async () => {
      const [response] = await productsModel.getProductById()

      expect(response).to.be.includes.all.keys('id', 'name', 'quantity')
    })

    it('O valor da chave id do objeto é igual ao id passado no parâmetro', async () => {
      const paramMoch = 7 
      const [response] = await productsModel.getProductById(paramMoch)

      expect(response).to.be.includes({id: paramMoch})
    })
  })
})