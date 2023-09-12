'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Encuesta extends Model {
        static associate(models) {
            Encuesta.belongsTo(models.User, {
                foreignKey: 'usuarioId',
                onDelete: 'CASCADE',
            });
        }
    }
    Encuesta.init({
        reseña: DataTypes.TEXT,        
        propuesta: DataTypes.TEXT,     
        actividad: DataTypes.TEXT,    
    }, {
        sequelize,
        modelName: 'Encuesta',
    });

    return Encuesta;
};
