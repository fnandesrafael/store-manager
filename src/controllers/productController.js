const productService = require('../services/productService');

const getProducts = async (_req, res) => {
  try {
    const products = await productService.getProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.log('Erro no controller getProducts', err.message);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);
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
    const createdProduct = await productService.createProduct(newProduct);
    return createdProduct.length > 0 ? res.status(201).json(createdProduct[0])
      : res.status(409).json({ message: 'Product already exists' });
  } catch (err) {
    console.log('Erro no controller postProduct', err.message);
    return res.status(400).json({ message: 'Internal server error' });
  }
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
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
};