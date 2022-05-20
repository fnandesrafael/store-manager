const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection')
const salesModel = require('../../../models/salesModel')

describe('Testa se a Model getSalesById realiza uma busca no BD "StoreManager.sales" com sucesso ', () => {
  describe('Quando não há um venda com o Id passado nos parâmetros', () => {
    beforeEach(() => {
      const queryResult = [[]]

      Sinon.stub(connection, 'query')
        .resolves(queryResult)
    })

    afterEach(() => {
      connection.query.restore();
    })

    it('Retorna um array', async () => {
      const response = await salesModel.getSaleById(7)

      expect(response).to.be.an('array')
    })

    it('Retorna um array vazio', async () => {
      const response = await salesModel.getSaleById(7)

      expect(response).to.be.empty
    })
  })

  describe('Quando há uma venda com o Id passado nos parâmetros', () => {
    beforeEach(() => {
      const queryResult = [[{
        date: "7777-77-77777:77:77.7777",
        productId: 7,
        quantity: 7
      }]]

      Sinon.stub(connection, 'query')
        .resolves(queryResult)
    })

    afterEach(() => {
      connection.query.restore();
    })

    it('Retorna um array', async () => {
      const response = await salesModel.getSaleById()

      expect(response).to.be.an('array')
    })

    it('O array retornado não está vazio', async () => {
      const response = await salesModel.getSaleById()

      expect(response).to.not.be.empty
    })

    it('O array retornado possui um objeto', async () => {
      const [response] = await salesModel.getSaleById()

      expect(response).to.be.an('object')
    })

    it('O objeto no array possui as chaves date, productId e quantity', async () => {
      const [response] = await salesModel.getSaleById()

      expect(response).to.be.includes.all.keys('date', 'productId', 'quantity')
    })

    it('O valor da chave productId do objeto é igual ao id passado no parâmetro', async () => {
      const paramMoch = 7 
      const [response] = await salesModel.getSaleById(paramMoch)

      expect(response).to.be.includes({productId: paramMoch})
    })
  })
})