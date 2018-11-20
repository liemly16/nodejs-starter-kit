'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('tbl_bill', 'status',  {
      type: Sequelize.STRING,
      validate: {
          isIn: [
              ['UNPAID', 'PAID', 'CANCEL']
          ]
      }
    });
  },

  down:async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('tbl_bill', 'status');
  }
};
