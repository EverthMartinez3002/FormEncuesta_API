'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pregunta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      texto_pregunta: {
        type: Sequelize.TEXT
      },
      tipo_pregunta: {
        type: Sequelize.STRING
      },
      encuestaId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: 'Encuesta', 
          key: 'id' 
        },
        onDelete: 'CASCADE'
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pregunta');
  }
};
