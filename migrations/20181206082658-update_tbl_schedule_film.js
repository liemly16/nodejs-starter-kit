'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tbl_schedule_film', 'start_time');
    return await queryInterface.addColumn('tbl_schedule_film', 'start_time', {
      type: 'TIMESTAMP'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tbl_schedule_film', 'start_time');
    return await queryInterface.addColumn('tbl_schedule_film', 'start_time', {
      type: 'TIMESTAMP'
    });
  }
};
