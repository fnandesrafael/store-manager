const productsService = require('../services/productsService');

const getProducts = async (_req, res) => {
  try {
    const products = await productsService.getProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsService.getProductById(id);
    return product.length > 0 ? res.status(200).json(product[0])
    : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
};