const productsModel = require('../models/productsModel');

const getProducts = async () => {
  try {
    const products = await productsModel.getProducts();
    return products;
  } catch (err) {
    console.log(err.messag);
  }
};

const getProductById = async (id) => {
  try {
    const product = await productsModel.getProductById(id);
    return product;
  } catch (err) {
    console.log(err.message);
  }
};
  
  module.exports = {
    getProducts,
    getProductById,
  };