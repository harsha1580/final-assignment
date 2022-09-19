const express = require("express");
const router = express.Router();
const authController = require("../controller/auth_controller");
const user_validation = require("../middelware/user_validation");

router.post("/signUp", user_validation.signUp, authController.register);

router.post("/signIn", user_validation.signIn, authController.login);

module.exports = router;