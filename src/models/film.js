import {
    sequelize,
    Sequelize
} from './base'

export default sequelize.define(
    'tbl_film',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
          },
          name: {
            type: Sequelize.STRING
          },
          start_time:{
            type: Sequelize.STRING
          },
          description:{
            type: Sequelize.STRING
          },
          avatar:{
            type:Sequelize.STRING
          },
          trailer:{
            type:Sequelize.STRING
          },
          status:{
            type:Sequelize.STRING,
            validate:{
              isIn:[
                ['WILL_BE_RELEASE','RELEASING','RELEASED']
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
