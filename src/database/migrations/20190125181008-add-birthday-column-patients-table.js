'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Patients', 'birthday', {
      type: Sequelize.DATE,
      allowNull: false
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Patients', 'birthday');
  }
};
