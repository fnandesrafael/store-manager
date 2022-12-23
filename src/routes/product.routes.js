const express = require('express');
const productsController = require('../controllers/productController');

const router = express.Router();

router.post('/', productsController.createProduct);

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.put('/:id', productsController.editProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;