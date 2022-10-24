const express = require('express');
const salesController = require('../controllers/saleController');
const validationMiddlewares = require('../middlewares/validationMiddlewares');

const router = express.Router();

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSaleById);

router.post('/', validationMiddlewares.saleValidation, salesController.createSale);

router.put('/:id', validationMiddlewares.saleValidation, salesController.editSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;