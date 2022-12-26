const Sale = require('../database/models/Sale');
const { SaleNotFound } = require('../error/errorCatalog');
const saleSchema = require('../database/schemas/saleSchema');
const productService = require('./productService');

const createSale = async (payload) => {
  await saleSchema.validateAsync(payload);

  await Promise.all(payload.map(async (obj) => {
    await productService.verifyProductQuantity(obj);
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

  if (sale.length === 0) throw SaleNotFound;

  return sale;
};

const editSale = async (id, payload) => {
  await saleSchema.validateAsync(payload);
  
  const [sale] = await Sale.editSale(id, payload);
  
  if (sale.affectedRows === 0) throw SaleNotFound;
  
  return { saleId: id, itemUpdated: payload };
};

const deleteSale = async (id) => {
  const [sale] = await Sale.deleteSale(id);
  
  if (sale.affectedRows === 0) throw SaleNotFound;

  return true;
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  editSale,
  deleteSale,
};