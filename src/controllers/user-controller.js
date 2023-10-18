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
        data: {
          transferSlip: url,
        },
        where: {
          userId: req.user.id,
        },
      });
    }
    res.status(200).json({ message: "Trasfer Slip uploaded successful" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.editAccount = async (req, res, next) => {
  try {
    const { mobile, address, firstName, lastName } = req.body;
    const updateprofile = await prisma.user.updateMany({
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
