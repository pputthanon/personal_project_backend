const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-service");

exports.order = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const data = req.body;

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

exports.getOrderItems = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const getOrderItems = await prisma.orderItems.findMany({
      where: {
        ordersId: +orderId,
      },
      include: {
        products: true,
      },
    });
    res.status(200).json({ getOrderItems });
  } catch (err) {
    next(err);
  }
};

// exports.getOrderByUserId = async (req, res, next) => {
//   try {
//     const { id } = req.user;
//     const getOrderByUserId = await prisma.orders.findMany({
//       where: {
//         userId: id,
//       },
//     });
//     res.status(200).json({ getOrderByUserId });
//   } catch (err) {
//     next(err);
//   }
// };
