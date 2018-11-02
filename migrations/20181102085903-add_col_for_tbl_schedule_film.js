'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tbl_schedule_film', 'price_member', {
      type: Sequelize.DOUBLE,
      
    });
    return await queryInterface.addColumn('tbl_schedule_film', 'price', {
      type: Sequelize.DOUBLE,
      
    });
  },

  down: async  (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tbl_schedule_film', 'price_member');
    return await queryInterface.removeColumn('tbl_schedule_film', 'price');
  }
};
