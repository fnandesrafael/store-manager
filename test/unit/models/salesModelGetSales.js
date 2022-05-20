const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../models/connection')
const salesModel = require('../../../models/salesModel')

describe('Testa se a Model getSales realiza uma busca no BD "StoreManager.sales" com sucesso',() => {
  describe('Quando não há vendas cadastrados', () => {
    beforeEach(() => {
      const queryResult = [[]]

      Sinon.stub(connection, 'query')
        .resolves(queryResult)
    })

    afterEach(() => {
      connection.query.restore();
    })
    
    it('Retorna um array', async () => {
      const response = await salesModel.getSales()

      expect(response).to.be.an('array');
    })

    it('O array retornado é vazio', async () => {
      const response = await salesModel.getSales()

      expect(response).to.be.empty;
    })

  })
  
  describe('Quando existem vendas registrados no banco de dados "StoreManager.sales"', () => {
    beforeEach(() => {
      const queryResult = [[{
        date: "7777-77-77777:77:77.7777",
        saleId: 7,
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
      const response = await salesModel.getSales()

      expect(response).to.be.an('array');
    })

    it('O array retornado não está vazio', async () => {
      const response = await salesModel.getSales()

      expect(response).to.not.be.empty;
    })

    it('O array é um array de objetos', async () => {
      const [response] = await salesModel.getSales()

      expect(response).to.be.an('object');
    })

    it('Os objetos no array possuem as chaves date, saleId, productId e quantity', async () => {
      const [response] = await salesModel.getSales()

      expect(response).to.be.includes.all.keys('date', 'saleId', 'productId', 'quantity')
    })
  })
})
