const Product = require('../database/models/Product');
const { productSchema } = require('../utils/joiSchemas');

const createProduct = async (product) => {
  try {
    await productSchema.validateAsync(product);
  } catch (err) {
    console.log(err);
    const statusCode = err.details[0].message.split(',')[0];
    const message = err.details[0].message.split(',')[1];

    return { statusCode, message: { message } };
  }

  const createdProduct = await Product.createProduct(product);
  return { statusCode: 201, message: createdProduct };
};

const getProducts = async () => {
  try {
    const products = await Product.getProducts();
    return { statusCode: 200, message: products };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, message: 'Internal server error' };
  }
};

const getProductById = async (id) => {
  const [product] = await Product.getProductById(id);

  if (!product) {
    return { statusCode: 404, message: { message: 'Product not found' } };
  }
  return { statusCode: 200, message: product };
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
    createProduct,
    getProducts,
    getProductById,
    editProduct,
    deleteProduct,
  };