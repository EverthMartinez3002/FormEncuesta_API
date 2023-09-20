const express = require("express");
const router = express.Router();
const middlewares = require('../../middlewares/auth.middlewares')

const respuestaController = require('../../controllers/respuesta.controller');

router.post('/', middlewares.authenticationSession, respuestaController.create);

module.exports = router;