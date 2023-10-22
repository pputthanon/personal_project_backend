const prisma = require("../models/prisma");

exports.order = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const totalPrice = req.body.total;

    const cart = await prisma.cart.findMany({
      where: {
        userId,
      },
    });

    console.log(cart);

    if (cart) {
      await prisma.orders.create({
        data: {
          userId: id,
          totalPrice: +totalPrice,
        },
      });
    }

    res.status(200).json({ message: "Created order" });
  } catch (err) {
    next(err);
  }
};
