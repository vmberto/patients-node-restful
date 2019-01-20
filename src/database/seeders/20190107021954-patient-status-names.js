'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PatientStatus', [
      { id: 1, name: 'Ativo' },
      { id: 2, name: 'Inativo' },
      { id: 3, name: 'De Alta' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PatientStatus');
  }
};
