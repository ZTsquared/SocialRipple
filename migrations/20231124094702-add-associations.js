"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn(
			"Volunteers", // name of Source table
			"user_id", // name of the key we're adding
			{
				type: Sequelize.INTEGER,
				references: {
					model: "Users", // name of Target table
					key: "id", // key in Target model that we're referencing
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			}
		);

		await queryInterface.addColumn(
			"Volunteers", // name of Source table
			"requirement_id", // name of the key we're adding
			{
				type: Sequelize.INTEGER,
				references: {
					model: "Requirements", // name of Target table
					key: "id", // key in Target model that we're referencing
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn(
			"Volunteers", // name of Source model
			"user_id" // key we want to remove
		);

		await queryInterface.removeColumn(
			"Volunteers", // name of Source model
			"requirement_id" // key we want to remove
		);
	},
};
