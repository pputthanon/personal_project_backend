const fs = require("fs/promises");
const { upload } = require("../utils/cloudinary-service");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { checkBookIdSchema } = require("../validators/delete-validator");

exports.createBook = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { name, author, price, categoryId } = req.body;
    // console.log(req.file);

    if (req.file) {
      const url = await upload(req.file.path);
      await prisma.products.create({
        data: {
          image: url,
          name,
          author,
          price: +price,
          categoryId: +categoryId,
        },
      });
    }

    res.status(201).json({ message: "created" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { value, error } = checkBookIdSchema.validate(req.params);

    console.log(value);

    if (error) {
      return next(error);
    }

    const existBook = await prisma.products.findFirst({
      where: {
        id: value.productId,
      },
    });

    if (!existBook) {
      return next(createError("Cannot delete this book", 400));
    }

    await prisma.products.delete({
      where: {
        id: value.productId,
      },
    });

    res.status(200).json({ message: "deleted" });
  } catch (err) {
    next(err);
  }
};
