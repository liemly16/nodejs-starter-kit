import {
    sequelize,
    Sequelize
} from './base'

export default sequelize.define(
    'tbl_bill_item',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
          },
          total_price:{
            type: Sequelize.DOUBLE,
            defaultValue: 0,
            allowNull: false
          },
          ticket_id:{
            type: Sequelize.UUID,
            references:{
              model:'tbl_ticket',
              key:'id'
            }
          },
          bill_id:{
            type: Sequelize.UUID,
            references:{
              model:'tbl_bill',
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
