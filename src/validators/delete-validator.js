const Joi = require("joi");

const checkBookIdSchema = Joi.object({
  productsId: Joi.number().integer().positive().required(),
});

exports.checkBookIdSchema = checkBookIdSchema;
