// user.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
class User extends Model {
  static associate(models) {
    // Definir la relación con Encuesta
    User.hasMany(models.Encuesta, {
      foreignKey: 'usuarioId',
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    Admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: false,
  }
);

return User;
}
