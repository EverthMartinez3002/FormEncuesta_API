const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Encuesta extends Model {
    static associate(models) {
      // Definir la relación con User
      Encuesta.belongsTo(models.User, {
        foreignKey: 'usuarioId',
        onDelete: 'CASCADE',
      });

      Encuesta.hasMany(models.Pregunta, {
        foreignKey: 'encuestaId',
      });
    }
  }

  Encuesta.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Encuesta',
      tableName: 'Encuesta',
      timestamps: false,
    }
  );

  return Encuesta;
};
