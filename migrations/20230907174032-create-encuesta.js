module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Encuesta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reseña: {
        type: Sequelize.TEXT
      },
      propuesta: {
        type: Sequelize.TEXT
      },
      actividad: {
        type: Sequelize.TEXT
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Encuesta');
  }
};
