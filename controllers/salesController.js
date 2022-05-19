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
  const sales = req.body;

  try {
    const createdSale = await salesService.createSale(sales);
    return res.status(201).json(createdSale);
  } catch (err) {
    console.log('Erro no controller postSale', err.message);
    return res.status(400).json({ message: 'Error while trying to registry your sale' });
  }
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const recoveredSales = req.body;

  try {
    const editedSales = await salesService.editSale(id, recoveredSales);
    return res.status(200).json(editedSales);
  } catch (err) {
    console.log('Erro no controller editSale', err.message);
  }
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  editSale,
};