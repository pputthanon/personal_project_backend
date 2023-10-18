const prisma = require("../models/prisma");

exports.addBook = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productsId } = req.body;

    // const oldproduct = await prisma.cart.findMany({});
    // const test = oldproduct.find(
    //   (el) => el.productsId == productsId && el.userId == id
    // );

    // if (test) {
    //   await prisma.cart.update({
    //     where: {
    //         id
    //     },
    //   })
    // }

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
