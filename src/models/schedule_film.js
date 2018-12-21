import {
  sequelize,
  Sequelize
} from './base'
import withDateNoTz from 'sequelize-date-no-tz-postgres';
import moment from 'moment';
const DataTypes = withDateNoTz(Sequelize);

export default sequelize.define(
  'tbl_schedule_film',
  {
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
      type: DataTypes.DATE_NO_TZ
    },
    price: {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
      allowNull: false
    },
    price_member: {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      validate: {
        isIn: [
          ['2D', '3D', 'BIG_SCREEN', 'FOUR_WAY_SOUND']
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
