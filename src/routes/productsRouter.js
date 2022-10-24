const express = require('express');
const productsController = require('../controllers/productsController');
const validationMiddlewares = require('../middlewares/validationMiddlewares');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.post('/', validationMiddlewares.productValidation, productsController.createProduct);

router.put('/:id', validationMiddlewares.productValidation, productsController.editProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;