const express = require("express");
const router = express.Router();
const middlewares = require("../../middlewares/auth.middlewares");

const userController = require("../../controllers/user.controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", middlewares.authenticationSession, userController.GetAllNormalUsers);

module.exports = router;