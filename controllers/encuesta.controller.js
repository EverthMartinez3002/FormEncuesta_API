const db = require('../db/models/index.js');

const encuestaController = {};

encuestaController.getAllByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, pageSize = 9 } = req.query;

    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

     const count = await db.Encuesta.count({
      where: {
        usuarioId: userId,
      },
    });

    const encuestas = await db.Encuesta.findAll({
      where: {
        usuarioId: userId,
      },
      include: [
        {
          model: db.Pregunta, 
          as: 'Pregunta', 
        },
      ],
      offset,
      limit
    });

    if (!encuestas || encuestas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron encuestas para este usuario' });
    }

    return res.status(200).json({ encuestas, count });
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

encuestaController.create = async (req, res) => {
  try {
    const { titulo, descripcion, usuarioId } = req.body;

    const nuevaEncuesta = await db.Encuesta.create({
      titulo,
      descripcion,
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      usuarioId,
    })


    res.status(201).json({ message: 'Encuesta creada con exito', encuesta: nuevaEncuesta });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear la encuesta' });
  }
}

encuestaController.AddUsers = async (req, res) => {
  try {
    const { titulo, descripcion, usuarios } = req.body;

    if (!titulo || !descripcion || !usuarios) {
      return res.status(400).json({ error: 'Los campos requeridos no están presentes o son inválidos.' });
    }

    const encuestasCreadas = await Promise.all(
      usuarios.map(async (usuarioId) => {
        const encuesta = await db.Encuesta.create({
          titulo,
          descripcion,
          fecha_inicio: new Date(),
          fecha_fin: new Date(),
          usuarioId,
        });
        return encuesta;
      })
    );

    res.status(201).json({ encuestas: encuestasCreadas });
  } catch (error) {
    console.error('Error al crear encuestas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = encuestaController;