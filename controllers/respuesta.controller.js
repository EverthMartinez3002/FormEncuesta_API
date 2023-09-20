const db = require('../db/models/index.js');

const respuestaController = {};

respuestaController.create = async (req, res) => {
    try {
      const respuestasData = req.body; 
  
      const nuevasRespuestas = [];
  
      for (const respuestaData of respuestasData) {
        const { texto_respuesta, preguntaId, usuarioId } = respuestaData;
  
        const respuesta = new db.Respuesta({
          texto_respuesta,
          preguntaId,
          usuarioId,
        });
  
        const nuevaRespuesta = await respuesta.save();
        nuevasRespuestas.push(nuevaRespuesta);
      }
  
      res.status(201).json({ respuestas: nuevasRespuestas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear las respuestas' });
    }
  };
module.exports = respuestaController;
