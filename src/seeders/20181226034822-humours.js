'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Humour', [
      { id: 1, title: 'Triste' },
      { id: 2, title: 'Raiva' },
      { id: 3, title: 'Medo' },
      { id: 4, title: 'Feliz' },
      { id: 5, title: 'Ansioso' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Humour', null, {});
  }
};
