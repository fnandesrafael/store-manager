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

  await saleService.deleteSale(id);
  
  return res.status(204).send();
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  editSale,
  deleteSale,
};