const { productSchema, saleSchema } = require('../utils/joiSchemas');

const productValidation = async (req, res, next) => {
  const { name, quantity } = req.body;

  try {
    await productSchema.validateAsync({ name, quantity });
  } catch (err) {
    const errStatus = err.details[0].message.split(',')[0];
    const errMessage = err.details[0].message.split(',')[1];

    return res.status(errStatus).json({ message: errMessage });
  } next();
};

const saleValidation = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    await saleSchema.validateAsync({ productId, quantity });
  } catch (err) {
    const errStatus = err.details[0].message.split(',')[0];
    const errMessage = err.details[0].message.split(',')[1];

    return res.status(errStatus).json({ message: errMessage });
  } next();
};

module.exports = {
  productValidation,
  saleValidation,
};