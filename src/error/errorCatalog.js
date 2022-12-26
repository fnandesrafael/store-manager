const ProductNotFound = {
  type: 'ProductNotFound',
  statusCode: 404,
  message: 'Product not found',
  isCataloged: true,
};

const SaleNotFound = {
  type: 'SaleNotFound',
  statusCode: 404,
  message: 'Sale Not Found',
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
  SaleNotFound,
  InvalidQuantity,
};