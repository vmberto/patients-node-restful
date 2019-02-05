'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('HealthInsurances', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('HealthInsurances', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
