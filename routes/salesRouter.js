const express = require('express');
const salesController = require('../controllers/salesController');
const validationMiddlewares = require('../middlewares/validationMiddlewares');

const router = express.Router();

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSaleById);

router.post('/', validationMiddlewares.saleValidation, salesController.postSale);

module.exports = router;