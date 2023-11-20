const express = require("express");

const adminController = require("../controllers/admin-controller");
const authenticateAdminMiddleware = require("../middlewares/admin-authenticate");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.get("/", adminController.getAllBook);

router.get(
  "/orders",
  authenticateAdminMiddleware,
  adminController.getAllOrders
);
router.get(
  "/orders/:orderId",
  authenticateAdminMiddleware,
  adminController.getOrderByOrderId
);

router.post(
  "/create",
  authenticateAdminMiddleware,
  uploadMiddleware.single("image"),
  adminController.createBook
);

router.patch(
  "/status/:orderId",
  authenticateAdminMiddleware,
  adminController.updateStatus
);

router.patch(
  "/edit/:productId",
  authenticateAdminMiddleware,
  adminController.editProduct
);

router.patch(
  "/delete/:id",
  authenticateAdminMiddleware,
  adminController.deleteBook
);

module.exports = router;
