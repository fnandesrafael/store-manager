const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const sales = req.body;

  const response = await saleService.createSale(sales);
  
  return res.status(201).json(response);
};

const getSales = async (_req, res) => {
  try {
    const sales = await saleService.getSales();
    return res.status(200).json(sales);
  } catch (err) {
    console.log('Erro no controller getSales', err.message);
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await saleService.getSaleById(id);
    return sale.length > 0 ? res.status(200).json(sale)
      : res.status(404).json({ message: 'Sale not found' });
  } catch (err) {
    console.log('Erro no controller getSaleById', err.message);
  }
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