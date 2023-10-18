const prisma = require("../models/prisma");

exports.addBook = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productsId } = req.body;

    const oldproduct = await prisma.cart.findFirst({
      where: {
        productsId,
        userId: id,
      },
    });
    console.log(oldproduct);
    if (oldproduct) {
      await prisma.cart.updateMany({
        data: {
          userId: id,
          productsId: productsId,
          amount: oldproduct.amount + 1,
        },
        where: {
          id: oldproduct.id,
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          userId: id,
          productsId: productsId,
          amount: 1,
        },
      });
    }

    console.log(req.body);
    res.status(201).json({ message: "added" });
  } catch (err) {
    next(err);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const { productsId, userId } = req.body;
    const getBook = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        products: {
          select: {
            name: true,
            author: true,
            price: true,
            image: true,
          },
        },
      },
    });
    res.status(201).json({ getBook });
  } catch (err) {
    next(err);
  }
};
