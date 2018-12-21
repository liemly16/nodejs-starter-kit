
'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DataTypes = withDateNoTz(Sequelize);
    await queryInterface.removeColumn('tbl_film', 'start_time');
    return await queryInterface.addColumn('tbl_film', 'start_time', {
      type: DataTypes.DATE_NO_TZ
    });
  },

  down: async (queryInterface, Sequelize) => {
    const DataTypes = withDateNoTz(Sequelize);
    await queryInterface.removeColumn('tbl_film', 'start_time');
    return await queryInterface.addColumn('tbl_film', 'start_time', {
      type: DataTypes.DATE_NO_TZ
    });
  }
};
