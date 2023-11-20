const createError = require("../utils/create-error");

const prisma = require("../models/prisma");

exports.editAccount = async (req, res, next) => {
  try {
    const { mobile, address, firstName, lastName } = req.body;
    const updateprofile = await prisma.user.update({
      data: {
        firstName,
        lastName,
        mobile,
        address,
      },
      where: {
        email: req.user.email,
      },
    });
    res.status(200).json({ message: "updated successful", updateprofile });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getOrder = await prisma.orders.findMany({
      where: {
        userId: +userId,
      },
    });
    res.status(200).json({ getOrder });
  } catch (err) {
    next(err);
  }
};
