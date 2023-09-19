'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Respuesta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      texto_respuesta: {
        type: Sequelize.TEXT
      },
      preguntaId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: 'Pregunta', 
          key: 'id' 
        },
        onDelete: 'CASCADE'
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Respuesta');
  }
};
