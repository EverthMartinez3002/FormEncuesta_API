const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Respuesta extends Model {
    static associate(models) {
      Respuesta.belongsTo(models.Pregunta, {
        foreignKey: 'preguntaId',
        onDelete: 'CASCADE',
      });
    }
  }

  Respuesta.init({
    texto_respuesta: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Respuesta',
  });

  return Respuesta;
};
