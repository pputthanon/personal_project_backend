const fs = require("fs/promises");
const { upload } = require("../utils/cloudinary-service");
const prisma = require("../models/prisma");

exports.createBook = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { name, author, price, categoryId, image } = req.body;

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
