const productsModel = require('../models/productsModel');

const getProducts = async () => {
  try {
    const products = await productsModel.getProducts();
    return products;
  } catch (err) {
    console.log('Erro no service getProducts', err.messag);
  }
};

const getProductById = async (id) => {
  try {
    const product = await productsModel.getProductById(id);
    return product;
  } catch (err) {
    console.log('Erro no service getProductById', err.message);
  }
};

const createProduct = async (product) => {
  try {
    const createdProduct = await productsModel.createProduct(product);
    return createdProduct;
  } catch (err) {
    console.log('Erro no service createProduct', err.message);
  }
};

const editProduct = async (product) => {
  try {
    const editedProduct = await productsModel.editProduct(product);
    return editedProduct;
  } catch (err) {
    console.log('Erro no service editProduct', err.message);
  }
};
  
  module.exports = {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
  };