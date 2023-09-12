const express = require("express");
const router = express.Router();

const encuestaController = require("../../controllers/encuesta.controller")

router.post('/', encuestaController.create);

module.exports = router;