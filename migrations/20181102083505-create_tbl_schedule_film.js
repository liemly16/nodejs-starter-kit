'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    return await queryInterface.createTable('tbl_schedule_film', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      film_id: {
        type: Sequelize.UUID,
        references: {
          model: 'tbl_film',
          key: 'id'
        }
      },
      room_id: {
        type: Sequelize.UUID,
        references: {
          model: 'tbl_room',
          key: 'id'
        }
      },
      start_time: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING,
        validate: {
          isIN: [
            ['2D','3D','BIG_SCREEN','FOUR_WAY_SOUND']
          ]
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
    return await queryInterface.dropTable('tbl_schedule_film');
  }
};