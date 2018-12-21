import {
    sequelize,
    Sequelize
} from './base'

export default sequelize.define(
    'tbl_seat',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
          },
          room_id: {
            type: Sequelize.UUID,
          },
          code: {
            type: Sequelize.STRING,
          },
          sub_fee: {
            type: Sequelize.INTEGER, // khong dung kieu number
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
        paranoid: false,
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
