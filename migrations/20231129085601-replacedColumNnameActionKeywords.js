"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.renameColumn("Actions_Keywords", "userId", "actionId");
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.renameColumn("Actions_Keywords", "actionId", "userId");
	},
};
