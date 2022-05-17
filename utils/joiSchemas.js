const Joi = require('joi').extend(require('@joi/date'));

const productSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(5)
    .messages({
      'any.required': '400,"name" is required',
      'string.min': '422,"name" length must be at least 5 characters long',
    }),
  quantity: Joi.number()
    .min(1)
    .required()
    .messages({
      'any.required': '400,"quantity" is required',
      'number.min': '422,"quantity" must be greater than or equal to 1',
    }),
});

const saleSchema = Joi.object({
  productId: Joi.number()
    .required()
    .messages({
      'any.required': '400,"productId" is required',
    }),
  quantity: Joi.number()
    .min(1)
    .required()
    .messages({
      'any.required': '400,"quantity" is required',
      'number.min': '422,"quantity" must be greater than or equal to 1',
    }),
});

module.exports = {
  productSchema,
  saleSchema,
};