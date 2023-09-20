const db = require('../db/models/index.js');

const encuestaController = {};

encuestaController.getAllByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const encuestas = await db.Encuesta.findAll({
            where: {
                usuarioId: userId,
            },
        });

        if (!encuestas || encuestas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron encuestas para este usuario' });
        }

        return res.status(200).json({ encuestas });
    } catch (error) {
        console.error('Error al recuperar las encuestas:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

encuestaController.isEncuestaContestada = async (req, res) => {
    try {
      const { encuestaId } = req.params;
  
      const encuesta = await db.Encuesta.findByPk(encuestaId);
  
      if (!encuesta) {
        return res.status(404).json({ message: 'Encuesta no encontrada' });
      }
  
      const preguntas = await db.Pregunta.findAll({
        where: { encuestaId },
      });
  
      if (preguntas && preguntas.length > 0) {
        const preguntaIds = preguntas.map((pregunta) => pregunta.id);

        const respuestas = await db.Respuesta.findAll({
          where: { preguntaId: preguntaIds },
        });
  
        if (respuestas.length > 0) {
          return res.status(200).json({ contestada: true });
        }
      }
  
      return res.status(200).json({ contestada: false });
    } catch (error) {
      console.error('Error al verificar si la encuesta está contestada:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
module.exports = encuestaController;