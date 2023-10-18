const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticate");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post("/", authenticateMiddleware, cartController.addBook);

router.get("/", cartController.getBook);

module.exports = router;
