const express = require("express");

const authAdminController = require("../controllers/admin-controller");
const authenticateAdminMiddleware = require("../middlewares/admin-authenticate");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/create",
  authenticateAdminMiddleware,
  uploadMiddleware.single("image"),
  authAdminController.createBook
);

module.exports = router;
