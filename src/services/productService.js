const Product = require('../database/models/Product');
const { ProductNotFound, InvalidQuantity } = require('../error/errorCatalog');
const productSchema = require('../database/schemas/productSchema');

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
  const product = await Product.getProductById(id);

  if (product.length === 0) throw ProductNotFound;
  
  return product[0];
};

const editProduct = async (id, payload) => {
  await productSchema.validateAsync(payload);
  
  const product = await Product.editProduct(id, payload);
  
  if (product.affectedRows === 0) throw ProductNotFound;
  
  return { id, ...payload };
};

const deleteProduct = async (id) => {
  const product = await Product.deleteProduct(id);

  if (product.affectedRows === 0) throw ProductNotFound;

  return true;
};

const verifyProductQuantity = async (sale) => {
  const product = await getProductById(sale.productId);
  
  if ((product.quantity - sale.quantity) < 0) throw InvalidQuantity;

  const payload = {
    name: product.name,
    quantity: product.quantity - sale.quantity,
  };

  await editProduct(sale.productId, payload);

  return true;
};
  
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  verifyProductQuantity,
};