const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticate");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post("/", authenticateMiddleware, cartController.addBook);

router.get("/:userId", authenticateMiddleware, cartController.getBook);

router.patch(
  "/add/:cartId",
  authenticateMiddleware,
  cartController.addBookCart
);

router.patch(
  "/remove/:cartId",
  authenticateMiddleware,
  cartController.removeBookCart
);

router.delete(
  "/:cartId",
  authenticateMiddleware,
  cartController.deleteBookCart
);

module.exports = router;
