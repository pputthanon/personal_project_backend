const fs = require("fs/promises");
const { upload } = require("../utils/cloudinary-service");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { checkBookIdSchema } = require("../validators/delete-validator");

exports.createBook = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(req.body);
    // console.log(req.file);

    if (req.file) {
      data.image = await upload(req.file.path);
      await prisma.products.create({
        data: {
          image: data.image,
          name: data.name,
          author: data.author,
          price: +data.price,
          categoryId: +data.categoryId,
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
    const softDeleted = await prisma.products.update({
      where: {
        id: +req.params.id,
      },
      data: {
        status: "DISABLE",
      },
    });

    res.status(200).json({ message: "Soft deleted", softDeleted });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const getAllOrders = await prisma.orders.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            mobile: true,
            address: true,
          },
        },
      },
    });

    res.status(200).json({ getAllOrders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderByOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const getOrderByOrderId = await prisma.orders.findFirst({
      where: {
        id: +orderId,
      },
    });
    res.status(200).json({ getOrderByOrderId });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    const updateStatus = await prisma.orders.update({
      data: {
        status: newStatus,
      },
      where: {
        id: +orderId,
      },
    });
    res.status(200).json({ message: "Status Updated" });
  } catch (err) {
    next(err);
  }
};

exports.getAllBook = async (req, res, next) => {
  try {
    const { value } = req.params;
    const allBooks = await prisma.products.findMany({
      where: {
        data: value,
      },
    });
    res.status(201).json({ allBooks });
  } catch (err) {
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const { value } = req.params;
    // const editProduct =

    if (req.body.status === "NOT") {
      // update status === req.body.status
      return res.status(201).json;
    }
  } catch (err) {
    next(err);
  }
};
