const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticate");
const orderController = require("../controllers/order-controller");

const router = express.Router();

router.post("/", authenticateMiddleware, orderController.order);

router.get("/:userId", authenticateMiddleware, orderController.getOrder);

module.exports = router;
