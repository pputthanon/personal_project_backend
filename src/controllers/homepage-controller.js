const prisma = require("../models/prisma");

exports.getBook = async (req, res, next) => {
  try {
    const { value } = req.params;
    const books = await prisma.products.findMany({
      where: {
        data: value,
      },
    });
    res.status(201).json({ books });
  } catch (err) {
    next(err);
  }
};
