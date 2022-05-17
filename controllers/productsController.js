const productsService = require('../services/productsService');

const getProducts = async (_req, res) => {
  try {
    const products = await productsService.getProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.log('Erro no controller getProducts', err.message);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsService.getProductById(id);
    return product.length > 0 ? res.status(200).json(product[0])
    : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    console.log('Erro no controller getProductById', err.message);
  }
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = {
    name,
    quantity,
  };

  try {
    return res.status(201).json(newProduct);
  } catch (err) {
    console.log('Erro no controller postProduct', err.message);
    return res.status(400).json({ message: err.message });
  }
};

const editProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const editedProduct = {
    name,
    quantity,
  };

  return res.status(200).json(editedProduct);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
};