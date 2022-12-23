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

    describe('e a venda não está cadastrada no banco de dados', async () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([[]])
      })
  
      after(() => {
        sinon.restore()
      })

      it('é retornado uma array vazio', async () => {
        const sut = await Sale.getSaleById(1);

        expect(sut).to.be.an('array');
        expect(sut).to.be.empty;
      });
    });
  });

  describe('quando é atualizada uma venda em específico', () => {
    describe('e a venda está cadastrada no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([{affectedRows: 1}, undefined])
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto com uma linha atualizada', async () => {
        const [sut] = await Sale.editSale(1, [{ productId: 1, quantity: 15 }])

        expect(sut).to.be.an('object')
        expect(sut.affectedRows).to.be.equal(1)
      });
    });

    describe('e a venda não está cadastrada no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([{affectedRows: 0}, undefined])
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto com uma linha atualizada', async () => {
        const [sut] = await Sale.editSale(1, [{ productId: 1, quantity: 15 }])

        expect(sut).to.be.an('object')
        expect(sut.affectedRows).to.be.equal(0)
      });
    });
  });

  describe('quando uma venda em específica é deletada', () => {
    describe('e a venda está cadastrada no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto com uma linha atualizada', async () => {
        const sut = await Sale.deleteSale(1)

        expect(sut).to.be.an('object')
        expect(sut.affectedRows).to.be.equal(1)
      });
    });

    describe('e a venda não está cadastrado no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([{ affectedRows: 0 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto com nenhuma linha atualizada', async () => {
        const sut = await Sale.deleteSale(1)

        expect(sut).to.be.an('object')
        expect(sut.affectedRows).to.be.equal(0)
      });
    });
  });
});