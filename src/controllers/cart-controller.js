const prisma = require("../models/prisma");

exports.addBook = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productsId } = req.body;
    const oldproduct = [].find(
      (el) => el.productsId == productsId && el.userId == id
    );
    if (oldproduct) {
      await prisma.cart.update({
        data: {
          userId: id,
          productsId: productsId,
          amount: oldproduct.amount + 1,
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
