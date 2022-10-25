const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon')
const connection = require('../../../database/connection')
const {
  newProductMock,
  allProductsMock,
  searchedProductMock,
  updatedProductMock,
  newProductPayload
} = require('../../mocks/Product');
const Product = require('../../../database/models/Product')

describe('01 - Testa a model Product', () => {
  describe('quando é criado um novo produto com sucesso', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([{ insertId: 0 }, undefined])
    })
  
    after(() => {
      sinon.restore();
    })
    
    it('é retornado um objeto', async () => {
      const sut = await Product.createProduct(newProductPayload)

      expect(sut).to.be.an('object')
    });

    it('o objeto contém as chaves: "id", "name", e "quantity"', async () => {
      const sut = await Product.createProduct(newProductPayload)

      expect(sut).to.have.all.keys('id', 'name', 'quantity')
    });
  });

  describe('quando são buscados todos os produtos com sucesso', () => {
    describe('e existem cadastros no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([allProductsMock])
      });
  
      after(() => {
        sinon.restore();
      });

      it('é retornado um array de objetos', async () => {
        const sut = await Product.getProducts()

        expect(sut).to.be.an('array')
        expect(sut[0]).to.be.an('object')
      });
  
      it('os objetos contém as chaves: "id", "name" e "quantity"', async () => {
        const sut = await Product.getProducts()

        expect(sut[0]).to.have.all.keys('id', 'name', 'quantity')
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
        const sut = await Product.getProducts()

        expect(sut).to.be.an('array')
        expect(sut).to.be.empty
      });
    });
  });

  describe('quando é buscado um produto em específico', () => {
    describe('e o produto está cadastrado no banco de dados', async () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([searchedProductMock])
      })
  
      after(() => {
        sinon.restore()
      })

      it('é retornado o produto pesquisado', async () => {
        const sut = await Product.getProductById(1)

        expect(sut).to.be.deep.equal(searchedProductMock)
      });

      it('o produto possui as chaves "id", "name" e "quantity"', async () => {
        const sut = await Product.getProductById(1)

        expect(sut).to.have.all.keys('id', 'name', 'quantity')
      });
    });

    describe('mas o produto não está cadastrado no banco de dados', async () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([[]])
      })
  
      after(() => {
        sinon.restore()
      })
      
      it('é retornado um array vazio', async () => {
        const sut = await Product.getProductById(1)

        expect(sut).to.be.an('array')
        expect(sut).to.be.empty
      });
    });
  });

  describe('quando é atualizado um produto em específico', () => {
    describe('e o produto está cadastrado no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto com uma linha atualizada', async () => {
        const sut = await Product.editProduct(1, { name: "Machado do Thor", quantity: 15 })

        expect(sut).to.be.an('object')
        expect(sut.affectedRows).to.be.equal(1)
      });
    });

    describe('e o produto não está cadastrado no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([{ affectedRows: 0 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto com nenhuma linha atualizada', async () => {
        const sut = await Product.editProduct(1, { name: "Machado do Thor", quantity: 15 })

        expect(sut).to.be.an('object')
        expect(sut.affectedRows).to.be.equal(0)
      });
    });
  });

  describe('quando um produto em específico é deletado', () => {
    describe('e o produto está cadastrado no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto com uma linha atualizada', async () => {
        const sut = await Product.deleteProduct(1)

        expect(sut).to.be.an('object')
        expect(sut.affectedRows).to.be.equal(1)
      });
    });

    describe('e o produto não está cadastrado no banco de dados', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([{ affectedRows: 0 }, undefined]);
      });

      after(() => {
        sinon.restore();
      });
      
      it('é retornado um objeto com nenhuma linha atualizada', async () => {
        const sut = await Product.deleteProduct(1, { name: "Machado do Thor", quantity: 15 })

        expect(sut).to.be.an('object')
        expect(sut.affectedRows).to.be.equal(0)
      });
    });
  });
});