const Sale = require('../database/models/Sale');

const getSales = async () => {
  try {
    const sales = await Sale.getSales();
    return sales;
  } catch (err) {
    console.log('Erro no service getSales', err.messsage);
  }
};

const getSaleById = async (id) => {
  try {
    const sale = await Sale.getSaleById(id);
    return sale;
  } catch (err) {
    console.log('Erro no service getSaleById', err.message);
  }
};

const createSale = async (sales) => {
  try {
    const createdSale = await Sale.createSale(sales);
    return createdSale;
  } catch (err) {
    console.log('Erro no service createSale', err.message);
  }
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
  getSales,
  getSaleById,
  createSale,
  editSale,
  deleteSale,
};