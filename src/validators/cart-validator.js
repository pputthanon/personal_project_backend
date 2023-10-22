const Joi = require("joi");

const checkCartIdSchema = Joi.object({
  cartId: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().positive().required(),
});

exports.checkCartIdSchema = checkCartIdSchema;
