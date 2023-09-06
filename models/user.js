'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Asociación con Encuesta
      User.hasMany(models.Encuesta, {
        foreignKey: 'usuarioId',
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: {
      type: DataTypes.ENUM('normal', 'admin'),
      defaultValue: 'normal',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
