'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    return await queryInterface.addIndex('tbl_customer', ['phone'], {
      indexName: 'tbl_customer_phone_key',
      indicesType: 'UNIQUE',
      where: {
        deleted_at: null
      }
    })
  },

  down: async function (queryInterface, Sequelize) {
    return await Promise.all([
      queryInterface.removeIndex('tbl_customer', 'tbl_customer_phone_key')
    ]);
  }
};
