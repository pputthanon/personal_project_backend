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
  "/delete/:productId",
  authenticateAdminMiddleware,
  adminController.deleteBook
);

module.exports = router;
