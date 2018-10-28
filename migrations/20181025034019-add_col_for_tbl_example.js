'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('tbl_example', 'employee_id', {
      type: Sequelize.UUID,
      references: {
        model: 'tbl_employee',
        key: 'id'
      }
    });
  },

  down: async  (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('tbl_example', 'employee_id');
  }
};
