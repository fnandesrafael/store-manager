const Product = require('../database/models/Product');
const { productSchema } = require('../utils/joiSchemas');

const createProduct = async (payload) => {
  const validatedProduct = await productSchema.validateAsync(payload);

  if (validatedProduct) {
    const product = await Product.createProduct(payload);
    
    return product;
  }
};

const getProducts = async () => {
  const products = await Product.getProducts();
  
  return products;
};

const getProductById = async (id) => {
  const [product] = await Product.getProductById(id);

  if (!product) {
    return { statusCode: 404, message: { message: 'Product not found' } };
  }
  
  return { statusCode: 200, message: product };
};

const editProduct = async (id, payload) => {
  try {
    await productSchema.validateAsync(payload);
  } catch (err) {
    console.log(err);
    const statusCode = err.details[0].message.split(',')[0];
    const message = err.details[0].message.split(',')[1];

    return { statusCode, message: { message } };
  }
  
  const product = await Product.editProduct(id, payload);

  if (product.affectedRows === 0) {
    return { statusCode: 404, message: { message: 'Product not found' } };
  }
  
  return { statusCode: 200, message: { id, ...payload } };
};

const deleteProduct = async (id) => {
  const product = await Product.deleteProduct(id);

  if (product.affectedRows === 0) {
    return { statusCode: 404, message: { message: 'Product not found' } };
  }

  return { statusCode: 204 };
};
  
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
};