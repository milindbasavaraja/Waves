const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const auth = require("../middleware/auth");

router.post("/register", authController.registerUser);
router.post("/sign-in", authController.signIn);
router.get("/is-auth", auth(), authController.isAuth);

router.get("/dog", auth("createAny", "dog"), authController.dog);

module.exports = router;
