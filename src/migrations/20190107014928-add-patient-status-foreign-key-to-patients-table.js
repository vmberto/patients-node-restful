'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Order belongsTo Customer
    return queryInterface;
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
