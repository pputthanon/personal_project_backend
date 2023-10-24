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

router.get("/:userId", authenticateMiddleware, orderController.getOrder);

module.exports = router;
