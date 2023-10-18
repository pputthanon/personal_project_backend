const prisma = require("../models/prisma");

exports.addBook = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (err) {
    next(err);
  }
  res.status(201).json({ message: "added" });
};
