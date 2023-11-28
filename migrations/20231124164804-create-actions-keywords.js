"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Actions_Keywords", {
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "Actions",
					key: "id",
				},
				allowNull: false,
			},
			keyword_id: {
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
		return queryInterface.dropTable("Actions_Keywords");
	},
};
