const Joi = require('joi').extend(require('@joi/date'));

const productSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(5)
    .messages({
      'any.required': '"name" is required',
      'string.min': '"name" length must be at least 5 characters long',
      'string.base': '"name" must be a string',
    }),
  quantity: Joi.number()
    .required()
    .messages({
      'any.required': '"quantity" is required',
      'number.base': '"quantity" must be a number',
    }),
});

module.exports = productSchema;