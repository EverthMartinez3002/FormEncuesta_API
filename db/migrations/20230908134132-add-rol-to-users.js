'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'rol', {
      type: Sequelize.ENUM('normal', 'admin'),
      defaultValue: 'normal',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'rol');
  }
};
