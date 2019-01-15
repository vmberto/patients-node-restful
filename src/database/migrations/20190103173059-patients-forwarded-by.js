'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Patients', 'forwarded_by', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Patients', 'forwarded_by', {
      type: Sequelize.STRING,
      allowNull: false
    })  }
};
