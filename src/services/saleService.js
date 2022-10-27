const Sale = require('../database/models/Sale');
const { ProductNotFound } = require('../error/errorCatalog');
const { saleSchema } = require('../utils/joiSchemas');
const productService = require('./productService');

const createSale = async (payload) => {
  await saleSchema.validateAsync(payload);

  await Promise.all(payload.map(async (sale) => {
    await productService.verifyProductQuantity(sale);
  }));

  const sale = await Sale.createSale(payload);
  
  return sale;
};

const getSales = async () => {
  const sales = await Sale.getSales();
  
  return sales;
};

const getSaleById = async (id) => {
  const sale = await Sale.getSaleById(id);

  if (sale.length === 0) {
    throw ProductNotFound;
  }

  return sale;
};

const editSale = async (id, sales) => {
  try {
    const editedSales = await Sale.editSale(id, sales);
    return editedSales;
  } catch (err) {
    console.log('Erro no service editSale', err.message);
  }
};

const deleteSale = async (id) => {
  try {
    const deletedSales = await Sale.deleteSale(id);
    return deletedSales;
  } catch (err) {
    console.log('Erro no service deleteSale', err.message);
  }
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  editSale,
  deleteSale,
};