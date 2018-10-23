import config from '../../config/database';
import _ from 'lodash';
import Sequelize from 'sequelize';


let option = {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    //timezone: config.get('server.timezone'),
}

if (config.ssl) {
    _.merge(option, {
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true
            }
        }
    })
}

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    option
)

export {
    Sequelize,
    sequelize
}