'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Users", // name of Source table
      "city", // name of the key we're adding
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Users", // name of Source model
      "city" // key we want to remove
    );
  }
};
