'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    return await queryInterface.createTable('tbl_room', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      number: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
        validate: {
          isIn: [
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
    return await queryInterface.dropTable('tbl_room');
  }
};