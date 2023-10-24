const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-service");

exports.order = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const data = req.body;
    console.log(req.file, "fback");
    // console.log(data, "req boby");
    const cart = await prisma.cart.findMany({
      where: {
        userId: id,
      },
    });

    if (req.file) {
      data.transferSlip = await upload(req.file.path);
    }

    if (cart) {
      const createOrder = await prisma.orders.create({
        data: {
          userId: id,
          totalPrice: +data.totalPrice,
          transferSlip: data.transferSlip,
        },
      });

      if (cart) {
        const order = await prisma.orders.findFirst({
          where: {
            userId: id,
            id: createOrder.id,
          },
        });
        if (order) {
          const orderItems = cart.map((cartItem) => {
            return {
              ordersId: order.id,
              amount: +cartItem.amount,
              productsId: +cartItem.productsId,
            };
          });

          // console.log(order);

          // console.log(orderItems);

          await prisma.orderItems.createMany({
            data: orderItems,
          });
        }

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
