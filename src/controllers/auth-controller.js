const { registerSchema } = require("../validators/auth-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    value.password = await bcrypt.hash(value.password, 12);

    const user = await prisma.user.create({
      data: value,
    });

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "1qw23er45ty67ui89op0",
      { expiresIn: process.env.JWT_EXPIRE }
    );

    delete user.password;

    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};
