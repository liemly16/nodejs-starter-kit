import {
    sequelize,
    Sequelize
} from './base'
import withDateNoTz from 'sequelize-date-no-tz-postgres';
const DataTypes = withDateNoTz(Sequelize);

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
            type: DataTypes.DATE_NO_TZ
          },
          description:{
            type: Sequelize.TEXT
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
