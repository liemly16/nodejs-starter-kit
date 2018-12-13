'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tbl_film', 'description');
    return await queryInterface.addColumn('tbl_film', 'description', {
      type: Sequelize.TEXT
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tbl_film', 'description');
    return await queryInterface.addColumn('tbl_film', 'description', {
      type: Sequelize.TEXT
    });
  }
};
