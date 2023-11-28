"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Preferences", {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      keywordId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Keywords",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },


	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Preferences");
	},
};
