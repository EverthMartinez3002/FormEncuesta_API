const db = require('../db/models/index.js');

const encuestraController = {};

encuestraController.create = async (req, res) => {
    try {
        const { reseña, propuesta, actividad, usuarioId } = req.body;

        const nuevaEncuesta = await db.Encuesta.create({
            reseña,
            propuesta,
            actividad,
            usuarioId,
        });

        return res.status(201).json({ message: 'Encuesta creada con éxito', encuesta: nuevaEncuesta });
    } catch (error) {
        console.error('Error al crear la encuesta:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = encuestraController;