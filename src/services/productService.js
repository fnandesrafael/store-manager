const Product = require('../database/models/Product');

const getProducts = async () => {
  try {
    const products = await Product.getProducts();
    return products;
  } catch (err) {
    console.log('Erro no service getProducts', err.messag);
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.getProductById(id);
    return product;
  } catch (err) {
    console.log('Erro no service getProductById', err.message);
  }
};

const createProduct = async (product) => {
  try {
    const createdProduct = await Product.createProduct(product);
    return createdProduct;
  } catch (err) {
    console.log('Erro no service createProduct', err.message);
  }
};

const editProduct = async (product) => {
  try {
    const editedProduct = await Product.editProduct(product);
    return editedProduct;
  } catch (err) {
    console.log('Erro no service editProduct', err.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.deleteProduct(productId);
    return deletedProduct;
  } catch (err) {
    console.log('Erro no service deleeProduct', err.message);
  }
};
  
  module.exports = {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
  };