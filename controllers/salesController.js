const salesService = require('../services/salesService');

const getSales = async (_req, res) => {
  try {
    const sales = await salesService.getSales();
    return res.status(200).json(sales);
  } catch (err) {
    console.log('Erro no controller getSales', err.message);
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesService.getSaleById(id);
    return sale.length > 0 ? res.status(200).json(sale)
      : res.status(404).json({ message: 'Sale not found' });
  } catch (err) {
    console.log('Erro no controller getSaleById', err.message);
  }
};

const createSale = async (req, res) => {
  const { productId, quantity } = req.body;

  const newSale = {
    quantity,
    productId,
  };

  try {
    return res.status(201).json(newSale);
  } catch (err) {
    console.log('Erro no controller postSale', err.message);
    return res.status(404).json({ message: err.message });
  }
};

const editSale = async (req, res) => {
  const { productId, quantity } = req.body;

  const editedSale = {
    productId,
    quantity,
  };

  return res.status(200).json(editedSale);
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  editSale,
};