const express = require('express');
const salesController = require('../controllers/saleController');

const router = express.Router();

router.post('/', salesController.createSale);

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSaleById);

router.put('/:id', salesController.editSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;