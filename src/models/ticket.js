import {
  sequelize,
  Sequelize
} from './base'

export default sequelize.define(
  'tbl_ticket',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    schedule_film_id: {
      type: Sequelize.UUID,
      references: {
        model: 'tbl_schedule_film',
        key: 'id',
      }
    },
    status: {
      type: Sequelize.STRING,
      validate: {

        isIn: [
          ['ORDERED', 'SOLD', 'EMPTY']
        ]
      }
    },
    seat_id: {
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
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ['deleted_at'] }
    },
    scopes: {
      deleted: {
        where: { deleted_at: { $ne: null } },
        paranoid: false
      }
    }
  }
)
