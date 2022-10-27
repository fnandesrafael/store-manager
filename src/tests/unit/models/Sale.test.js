const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../database/connection');
const Sale = require('../../../database/models/Sale');
const { newSalePayload } = require('../../mocks/Sale');

describe('Testa a model Sale', () => {
  describe('quando é criado um novo produto com sucesso', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }, undefined])
    })
  
    after(() => {
      sinon.restore();
    })
    
    it('é retornado um objeto', async () => {
      const sut = await Sale.createSale(newSalePayload);

      expect(sut).to.be.an('object');
    });

    it('o objeto contém as chaves: "id" e "itemsSold"', async () => {
      const sut = await Sale.createSale(newSalePayload);

      expect(sut).to.have.all.keys('id', 'itemsSold');
    });
  });
});