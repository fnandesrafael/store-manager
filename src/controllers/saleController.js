const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const sales = req.body;

  const response = await saleService.createSale(sales);
  
  return res.status(201).json(response);
};

const getSales = async (_req, res) => {
  const response = await saleService.getSales();

  return res.status(200).json(response);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const response = await saleService.getSaleById(id);

  return res.status(200).json(response);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const response = await saleService.editSale(id, sales);
  return res.status(200).json(response);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await saleService.deleteSale(id);
    return deletedSale.length > 0 ? res.status(204).send()
      : res.status(404).json({ message: 'Sale not found' });
  } catch (err) {
    console.log('Erro no controller deleteSale', err.message);
  }
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  editSale,
  deleteSale,
};