const prisma = require("../models/prisma");

exports.order = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const totalPrice = req.body.total;

    const cart = await prisma.cart.findMany({
      where: {
        userId: id,
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

    if (cart) {
      const order = await prisma.orders.findFirst({
        where: {
          userId: id,
        },
      });

      console.log(order);

      if (order) {
        const orderItems = cart.map((cartItem) => {
          return {
            ordersId: order.id,
            amount: +cartItem.amount,
            productsId: +cartItem.productsId,
          };
        });
        console.log(orderItems);

        await prisma.orderItems.createMany({
          data: orderItems,
        });

        await prisma.cart.deleteMany({
          where: {
            userId,
          },
        });
      }
    }

    res.status(200).json({ message: "Created order" });
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
    res.status(201).json({ getOrder });
  } catch (err) {
    next(err);
  }
};
