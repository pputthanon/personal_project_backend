const express = require("express");

const adminController = require("../controllers/admin-controller");
const authenticateAdminMiddleware = require("../middlewares/admin-authenticate");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/create",
  authenticateAdminMiddleware,
  uploadMiddleware.single("image"),
  adminController.createBook
);

router.delete(
  "/delete/:productsId",
  authenticateAdminMiddleware,
  adminController.deleteBook
);

module.exports = router;
