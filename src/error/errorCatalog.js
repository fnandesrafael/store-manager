const ProductNotFound = {
  type: 'ProductNotFound',
  statusCode: 404,
  message: 'Product not found',
  isCataloged: true,
};

const InvalidQuantity = {
  type: 'InvalidQuantity',
  statusCode: 400,
  message: 'Order quantity for some products exceeds stock',
  isCataloged: true,
};

module.exports = {
  ProductNotFound,
  InvalidQuantity,
};