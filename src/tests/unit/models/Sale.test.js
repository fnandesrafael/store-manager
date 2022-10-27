const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../database/connection');
const Sale = require('../../../database/models/Sale');
const { newSalePayload, allSalesMock, searchedSaleMock } = require('../../mocks/Sale');

describe('Testa a model Sale', () => {
  describe('quando é criada uma nova venda com sucesso', () => {
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

  describe('quando são buscadas todas as vendas com sucesso', () => {
    describe('e existem cadastros no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([allSalesMock])
      });
  
      after(() => {
        sinon.restore();
      });

      it('é retornado um array de objetos', async () => {
        const sut = await Sale.getSales()

        expect(sut).to.be.an('array')
        expect(sut[0]).to.be.an('object')
      });
  
      it('os objetos contém as chaves: "id", "name" e "quantity"', async () => {
        const sut = await Sale.getSales()

        expect(sut[0]).to.have.all.keys('date', 'saleId', 'productId', 'quantity')
      });
    });

    describe('e não existem cadastros no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([[]])
      });
  
      after(() => {
        sinon.restore();
      });

      it('é retornado um array vazio', async () => {
        const sut = await Sale.getSales()

        expect(sut).to.be.an('array')
        expect(sut).to.be.empty
      });
    });
  });

  describe('quando é buscada uma venda em específico', () => {
    describe('e a venda está cadastrada no banco de dados', async () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([searchedSaleMock])
      })
  
      after(() => {
        sinon.restore()
      })

      it('é retornado uma array da venda pesquisada, contendo os produtos vendidos', async () => {
        const sut = await Sale.getSaleById(1);

        expect(sut).to.be.deep.equal(searchedSaleMock);
      });

      it('os produtos vendidos possuem as chaves "date", "saleId", "productId" e "quantity"', async () => {
        const sut = await Sale.getSaleById(1);

        expect(sut[0]).to.have.all.keys('date', 'saleId', 'productId', 'quantity');
      });
    });
  });
});