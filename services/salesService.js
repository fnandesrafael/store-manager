const salesModel = require('../models/salesModel');

const getSales = async () => {
  try {
    const sales = await salesModel.getSales();
    return sales;
  } catch (err) {
    console.log('Erro no service getSales', err.messsage);
  }
};

const getSaleById = async (id) => {
  try {
    const sale = await salesModel.getSaleById(id);
    return sale;
  } catch (err) {
    console.log('Erro no service getSaleById', err.message);
  }
};

module.exports = {
  getSales,
  getSaleById,
};