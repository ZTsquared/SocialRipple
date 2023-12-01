'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Requirements", // name of Source table
      "name", // name of the key we're adding
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.changeColumn(
      "Requirements", // name of Source table
      "description", // name of the key we're adding
      {
        type: Sequelize.TEXT,
        allowNull: true
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Requirements", // name of Source model
      "name" // key we want to remove
    );

    await queryInterface.changeColumn(
      "Requirements", // name of Source table
      "description", // name of the key we're adding
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  }
};
