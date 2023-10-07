const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/user");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);

module.exports = router;
