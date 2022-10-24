const { saleSchema } = require('../utils/joiSchemas');

const saleValidation = async (req, res, next) => {
  const sales = req.body;

  try {
    await saleSchema.validateAsync(sales);
  } catch (err) {
    const errStatus = err.details[0].message.split(',')[0];
    const errMessage = err.details[0].message.split(',')[1];

    return res.status(Number(errStatus)).json({ message: errMessage });
  } next();
};

module.exports = {
  saleValidation,
};