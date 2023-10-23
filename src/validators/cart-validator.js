const Joi = require("joi");

const checkCartIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().positive().required(),
  productsId: Joi.number().integer().positive().required(),
  userId: Joi.number().integer().positive().required(),
});

exports.checkCartIdSchema = checkCartIdSchema;
