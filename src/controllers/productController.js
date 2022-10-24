const productService = require('../services/productService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const response = await productService.createProduct({ name, quantity });
  
  return res.status(response.statusCode).json(response.message);
};

const getProducts = async (_req, res) => {
  const response = await productService.getProducts();
  
  return res.status(response.statusCode).json(response.message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const response = await productService.getProductById(id);
  
  return res.status(response.statusCode).json(response.message);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const payload = {
    name,
    quantity,
  };

  const response = await productService.editProduct(id, payload);
  
  return res.status(response.statusCode).json(response.message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const response = await productService.deleteProduct(id);

  return res.status(response.statusCode).json(response.message);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
};