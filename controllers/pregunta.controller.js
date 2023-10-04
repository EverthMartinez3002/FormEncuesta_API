const db = require('../db/models/index.js');

const preguntaController = {};

preguntaController.GetAllByEncuestaId = async (req, res) => {
    try {
        const { encuestaId } = req.params;
        const encuesta = await db.Encuesta.findByPk(encuestaId, {
            attributes: ['id', 'titulo', 'descripcion', 'usuarioId'],
            include: db.Pregunta,
        });

        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        const preguntas = encuesta.Pregunta;

        res.status(200).json(encuesta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al recuperar preguntas' });
    }
};

preguntaController.create = async (req, res) => {
    try {
        const { preguntas, encuestaId } = req.body;

        if (!encuestaId) {
            return res.status(400).json({ error: 'No se proporcionó un encuestaId válido.' });
        }

        const preguntasCreadas = await db.Pregunta.bulkCreate(
            preguntas.map(pregunta => ({ ...pregunta, encuestaId }))
        );

        res.status(201).json({ preguntas: preguntasCreadas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear las preguntas.' });
    }
};

preguntaController.createByEncuesta = async (req, res) => {
    try {
        const { preguntas, encuestasIds } = req.body;

        const preguntasCreadas = [];

        for (const encuestaId of encuestasIds) {
            const preguntasDeEncuesta = preguntas.map(pregunta => ({
                ...pregunta,
                encuestaId: encuestaId
            }));

            const preguntasCreadasDeEncuesta = await db.Pregunta.bulkCreate(preguntasDeEncuesta);
            preguntasCreadas.push(...preguntasCreadasDeEncuesta);
        }

        res.status(201).json({ preguntas: preguntasCreadas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear las preguntas.' });
    }
};

module.exports = preguntaController;