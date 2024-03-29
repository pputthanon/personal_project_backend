const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticate");
const orderController = require("../controllers/order-controller");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  uploadMiddleware.single("transferSlip"),
  orderController.order
);

router.get("/:orderId", authenticateMiddleware, orderController.getOrderItems);

// router.get(
//   "/getOrderByUserId/:userId",
//   authenticateMiddleware,
//   orderController.getOrderByUserId
// );

module.exports = router;
