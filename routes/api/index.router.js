const express = require("express");
const router = express.Router();

const userRouter = require('../api/user.router');
const encuestaRouter = require('../api/encuesta.router');

router.use("/user", userRouter);
router.use("/encuesta", encuestaRouter);

module.exports = router;