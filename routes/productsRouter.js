const express = require('express');
const productsController = require('../controllers/productsController');
const validationMiddlewares = require('../middlewares/validationMiddlewares');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.post('/', validationMiddlewares.productValidation, productsController.postProduct);

module.exports = router;