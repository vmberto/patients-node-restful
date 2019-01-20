'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MaritalStatusType', [
      { id: 1, name: 'Solteiro' },
      { id: 2, name: 'Casado' },
      { id: 3, name: 'Separado' },
      { id: 4, name: 'Divorciado' },
      { id: 5, name: 'Viúvo' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MaritalStatusType');
  }
};
