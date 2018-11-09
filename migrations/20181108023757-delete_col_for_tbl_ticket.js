'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('tbl_ticket', 'schedule_film_id');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('tbl_ticket', 'schedule_film_id', {
      type: Sequelize.UUID,
      
    });
  }
};