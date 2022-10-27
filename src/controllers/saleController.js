const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const sales = req.body;

  const response = await saleService.createSale(sales);
  
  return res.status(201).json(response);
};

const getSales = async (_req, res) => {
  const sales = await saleService.getSales();

  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.getSaleById(id);
  
  return res.status(200).json(sale);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const recoveredSales = req.body;

  try {
    const editedSales = await saleService.editSale(id, recoveredSales);
    return res.status(200).json(editedSales);
  } catch (err) {
    console.log('Erro no controller editSale', err.message);
  }
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