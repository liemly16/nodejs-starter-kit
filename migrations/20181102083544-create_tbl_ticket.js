'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    return await queryInterface.createTable('tbl_ticket', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      schedule_film_id: {
        type: Sequelize.UUID,
        references: {
          model: 'tbl_film',
          key: 'id',
        }
      },

      status: {
        type: Sequelize.STRING,
        validate: {
          isIN: [
            ['ORDERED','SOLD','EMPTY']
          ]
        }
      },
      seat_id:{
        type: Sequelize.UUID,
        references: {
          model: 'tbl_seat',
          key: 'id',
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
    return await queryInterface.dropTable('tbl_ticket');
  }
};