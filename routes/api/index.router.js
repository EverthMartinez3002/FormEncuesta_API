const express = require("express");
const router = express.Router();

const userRouter = require('../api/user.router');
const encuestaRouter = require('../api/encuesta.router');
const preguntaRouter = require('../api/pregunta.router');
const respuestaRouter = require('../api/respuesta.router');

router.use("/user", userRouter);
router.use("/encuesta", encuestaRouter);
router.use("/pregunta", preguntaRouter);
router.use("/respuesta", respuestaRouter);

module.exports = router;