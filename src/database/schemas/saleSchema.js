const Joi = require('joi').extend(require('@joi/date'));

const saleSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number()
      .required()
      .messages({
        'any.required': '"productId" is required',
      }),
    quantity: Joi.number()
      .required()
      .messages({
        'any.required': '"quantity" is required',
      }),
  }),
);

module.exports = saleSchema;