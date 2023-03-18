const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth-controller");

router.post("/register", auth.registerUser);
router.post("/sign-in", auth.signIn);
router.get("/is-auth", auth.isAuth);

module.exports = router;
