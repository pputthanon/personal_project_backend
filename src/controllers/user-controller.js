const fs = require("fs/promises");
const createError = require("../utils/create-error");

const { upload } = require("../utils/cloudinary-service");
const prisma = require("../models/prisma");

exports.uploadSlip = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createError("Transfer Slip is required", 400));
    }

    if (req.file) {
      const url = await upload(req.file.path);
      await prisma.orders.update({
        where: {
          AND: {
            userId: req.user.id,
            id,
          },
        },
        data: {
          transferSlip: url,
        },
      });
    }
    res.status(200).json({ message: "Trasfer Slip uploaded successful" });
  } catch (err) {
    next(err);
  } finally {
    if (res.file) {
      fs.unlink(req.file.path);
    }
  }
};

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
