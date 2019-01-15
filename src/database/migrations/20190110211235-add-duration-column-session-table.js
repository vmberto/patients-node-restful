'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Sessions', 'duration', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Sessions', 'duration', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
};
