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
  
  const newProduct = {
    id,
    name,
    quantity,
  };

  try {
    const editedProduct = await productService.editProduct(newProduct);
    return editedProduct.length === 0 ? res.status(404).json({ message: 'Product not found' })
      : res.status(200).json(newProduct);
  } catch (err) {
    console.log('Erro no controller editProduct', err.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(id);
    return deletedProduct.length > 0 ? res.status(204).send()
      : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    console.log('Erro no controller deleteProduct', err.message);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
};