const express = require("express");

const userController = require("../controllers/user-controller");
const authenticateMiddleware = require("../middlewares/authenticate");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.get("/:userId", authenticateMiddleware, userController.getOrder);

router.patch(
  "/payment-inform",
  uploadMiddleware.single("transferSlip"),
  userController.uploadSlip
);

router.patch("/edit", authenticateMiddleware, userController.editAccount);

module.exports = router;
