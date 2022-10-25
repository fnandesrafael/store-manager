const Product = require('../database/models/Product');
const { ProductNotFound } = require('../error/errorCatalog');
const { productSchema } = require('../utils/joiSchemas');

const createProduct = async (payload) => {
  await productSchema.validateAsync(payload);

  const product = await Product.createProduct(payload);
  
  return product;
};

const getProducts = async () => {
  const products = await Product.getProducts();
  
  return products;
};

const getProductById = async (id) => {
  const [product] = await Product.getProductById(id);

  if (product.length === 0) {
    throw ProductNotFound;
  }
  
  return product;
};

const editProduct = async (id, payload) => {
  await productSchema.validateAsync(payload);
  
  const product = await Product.editProduct(id, payload);
  
  if (product.affectedRows === 0) {
    throw ProductNotFound;
  } return { id, ...payload };
};

const deleteProduct = async (id) => {
  const product = await Product.deleteProduct(id);

  if (product.affectedRows === 0) {
    throw ProductNotFound;
  } return true;
};
  
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
};