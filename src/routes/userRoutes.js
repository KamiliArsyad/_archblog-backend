const express = require("express");
const { registerUser, authUser } = require("../controllers/admController");
const adminAuth = require("../middlewares/adminAuthMiddleware");
const router = express.Router();

router.route("/register").post(adminAuth, registerUser);
router.route("/login").post(authUser);

module.exports = router;
