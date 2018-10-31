'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    return await queryInterface.createTable('tbl_bill', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      total_price:{
        type: Sequelize.DOUBLE,
      },
      note:{
        type: Sequelize.STRING,
      },
      customer_id:{
        type: Sequelize.UUID,
        references:{
          model:'tbl_customer',
          key:'id'
        }
      },
      employee_id:{
        type: Sequelize.UUID,
        references:{
          model:'tbl_employee',
          key:'id'
        }
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      deleted_at: { type: 'TIMESTAMP' }
    })
  },

  down: async function (queryInterface, Sequelize) {
    return await queryInterface.dropTable('tbl_bill');
  }
};