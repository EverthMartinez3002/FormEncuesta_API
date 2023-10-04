const express = require("express");
const router = express.Router();
const middlewares = require("../../middlewares/auth.middlewares");

const preguntaController = require('../../controllers/pregunta.controller');

router.get("/:encuestaId", middlewares.authenticationSession, preguntaController.GetAllByEncuestaId);
router.post('/create', middlewares.authenticationSession, preguntaController.create);
router.post('/encuesta/create', middlewares.authenticationSession, preguntaController.createByEncuesta);


module.exports = router;