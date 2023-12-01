'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Actions", // name of Source table
      "city", // name of the key we're adding
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      "Actions", // name of Source table
      "coverImage", // name of the key we're adding
      {
        type: Sequelize.TEXT,
        allowNull: true
      }
    );

    await queryInterface.changeColumn(
      "Actions", // name of Source table
      "description", // name of the key we're adding
      {
        type: Sequelize.TEXT,
        allowNull: true
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Actions", // name of Source model
      "city" // key we want to remove
    );

    await queryInterface.removeColumn(
      "Actions", // name of Source model
      "coverImage" // key we want to remove
    );

    await queryInterface.changeColumn(
      "Actions", // name of Source table
      "description", // name of the key we're adding
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  }
};
