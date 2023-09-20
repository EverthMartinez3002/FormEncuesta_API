const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Pregunta extends Model {
    static associate(models) {
      Pregunta.belongsTo(models.Encuesta, {
        foreignKey: 'encuestaId',
        onDelete: 'CASCADE',
      });
    }
  }

  Pregunta.init({
    texto_pregunta: DataTypes.TEXT,
    tipo_pregunta: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Pregunta',
    timestamps: false,
  });

  return Pregunta;
};
