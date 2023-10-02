const express = require("express");
const router = express.Router();
const middlewares = require('../../middlewares/auth.middlewares')

const encuestaController = require("../../controllers/encuesta.controller")

router.get('/:userId', middlewares.authenticationSession, encuestaController.getAllByUserId);
router.get('/respuestas/:encuestaId', middlewares.authenticationSession, encuestaController.isEncuestaContestada);
router.post('/create', middlewares.authenticationSession, encuestaController.create);
router.post('/createUsers', middlewares.authenticationSession, encuestaController.AddUsers);

module.exports = router;