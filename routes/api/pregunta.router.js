const express = require("express");
const router = express.Router();
const middlewares = require("../../middlewares/auth.middlewares");

const preguntaController = require('../../controllers/pregunta.controller');

router.get("/:encuestaId", middlewares.authenticationSession, preguntaController.GetAllByEncuestaId);


module.exports = router;