const Joi = require("joi");

const checkBookIdSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

exports.checkBookIdSchema = checkBookIdSchema;
