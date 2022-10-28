const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const Sale = require('../../../database/models/Sale');
const saleService = require('../../../services/saleService');
const productService = require('../../../services/productService');
const { newSaleMock, newSalePayload, allSalesMock, searchedSaleMock, updatedSaleMock, updateSalePayload } = require('../../mocks/Sale');

describe('Testa a service saleService', () => {
  describe('quando é criada uma nova venda', () => {
    describe('e o corpo da requisição é válido', () => {
      before(() => {
        sinon.stub(Sale, 'createSale').resolves(newSaleMock)
        sinon.stub(productService, 'verifyProductQuantity').resolves(true)
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto', async () => {
        const sut = await saleService.createSale(newSalePayload)

        expect(sut).to.be.an('object')
      });

      it('o objeto retornado possui as chaves: "id" e "itemsSold"',
      async () => {
        const sut = await saleService.createSale(newSalePayload)

        expect(sut).to.have.all.keys('id', 'itemsSold')
      });
    });

    describe('e o corpo da requisição é inválido', () => {
      before(() => {
        sinon.stub(Sale, 'createSale').resolves(newSaleMock)
        sinon.stub(productService, 'verifyProductQuantity').resolves(true)
      });

      after(() => {
        sinon.restore();
      });
      
      it('é disparado um erro de validação Joi', async () => {
        try {
          await saleService.createSale({})
        } catch (err) {
          
          expect(err.isJoi).to.be.true
        }
      });
    });

    describe('e a quantidade de produtos vendidos, excede o estoque', () =>{
      before(() => {
        sinon.stub(Sale, 'createSale').resolves();
        sinon.stub(productService, 'verifyProductQuantity').throws({
          isCataloged: true
        })
      });
      
      after(() => {
        sinon.restore();
      });
      
      it('é disparado um erro catalogado', async () => {
        try {
          await saleService.createSale(newSalePayload)
        } catch(err) {

          expect(err.isCataloged).to.be.true;
        }
      });
    });
  });

  describe('quando são buscadas todas as vendas', () => {
    describe('e existem cadastrados no banco de dados', () => { 
      before(() => {
        sinon.stub(Sale, 'getSales').resolves(allSalesMock)
      });
  
      after(() => {
        sinon.restore();
      });

      it('é retornado um array de objetos', async () => {
        const sut = await saleService.getSales()

        expect(sut).to.be.an('array')
        expect(sut[0]).to.be.an('object')
      });
  
      it('os objetos contém as chaves: "date", "saleId", "productId" e "quantity"', async () => {
        const sut = await saleService.getSales()

        expect(sut[0]).to.have.all.keys('date', 'saleId', 'productId', 'quantity')
      });
    });

    describe('e não existem cadastros no banco de dados', () => {
      before(() => {
        sinon.stub(Sale, 'getSales').resolves([])
      });
  
      after(() => {
        sinon.restore();
      });

      it('é retornado um array vazio', async () => {
        const sut = await saleService.getSales()

        expect(sut).to.be.an('array')
        expect(sut).to.be.empty
      });
    });
  });

  describe('quando é buscada uma venda em específico', () => {
    describe('e a venda está cadastrada no banco de dados', async () => {
      before(() => {
        sinon.stub(Sale, 'getSaleById').resolves(searchedSaleMock);
      });
  
      after(() => {
        sinon.restore();
      });

      it('é retornado um array da venda pesquisada', async () => {
        const sut = await saleService.getSaleById(1);

        expect(sut).to.be.deep.equal(searchedSaleMock);
      });

      it('os produtos vendidos possuem as chaves: "date", "saleId", "productId" e "quantity"', async () => {
        const sut = await saleService.getSaleById(1)

        expect(sut[0]).to.have.all.keys('date', 'saleId', 'productId', 'quantity')
      });
    });

    describe('mas a venda não está cadastrada no banco de dados', async () => {
      before(() => {
        sinon.stub(Sale, 'getSaleById').resolves([])
      })
  
      after(() => {
        sinon.restore()
      })
      
      it('é disparado um erro catalogado', async () => {
        try {
          await saleService.getSaleById(1)
        } catch(err) {

          expect(err.isCataloged).to.be.true;
        }
      });
    });
  });

  describe('quando é atualizada uma venda específica', () => {
    describe('e a venda está cadastrada no banco de dados', () => {
      before(() => {
        sinon.stub(Sale, 'editSale').resolves([{ affectedRows: 1 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado o objeto atualizado', async () => {
        const sut = await saleService.editSale(1, updateSalePayload)

        expect(sut).to.be.an('object')
        expect(sut).to.be.deep.equal(updatedSaleMock)
      });
    });

    describe(`e a venda está cadastrada no banco de dados, mas o corpo
    da requisição é invalido`, async () => {
      before(() => {
        sinon.stub(Sale, 'editSale').resolves([{ affectedRows: 0 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });

      it('é disparado um erro de validação Joi', async () => {
        try {
          await productService.editProduct(1, {})
        } catch (err) {
          
          expect(err.isJoi).to.be.true
        }
      });
    })

    describe('e o produto não está cadastrado no banco de dados', () => {
      before(() => {
        sinon.stub(Sale, 'editSale').resolves([{ affectedRows: 0 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é disparado um erro catalogado', async () => {
        try {
          await saleService.editSale(1, updateSalePayload)
        } catch(err) {

          expect(err.isCataloged).to.be.true;
        }
      });
    });
  });

  describe('quando uma venda em específico é deletada', () => {
    describe('e a venda está cadastrada no banco de dados', () => {
      before(() => {
        sinon.stub(Sale, 'deleteSale').resolves([{ affectedRows: 1 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado true', async () => {
        const sut = await saleService.deleteSale(1)

        expect(sut).to.be.true
      });
    });

    describe('e a venda não está cadastrada no banco de dados', () => {
      before(() => {
        sinon.stub(Sale, 'deleteSale').resolves([{ affectedRows: 0 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é disparado um erro catalogado', async () => {
        try {
          await saleService.deleteSale(1)
        } catch(err) {

          expect(err.isCataloged).to.be.true
        }
      });
    });
  });
});