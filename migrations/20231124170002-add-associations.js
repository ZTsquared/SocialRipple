"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn(
			"Volunteerships", // name of Source table
			"user_id", // name of the key we're adding
			{
				type: Sequelize.INTEGER,
				references: {
					model: "Users", // name of Target table
					key: "id", // key in Target model that we're referencing
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			}
		);

		await queryInterface.addColumn(
			"Volunteerships", // name of Source table
			"requirement_id", // name of the key we're adding
			{
				type: Sequelize.INTEGER,
				references: {
					model: "Requirements", // name of Target table
					key: "id", // key in Target model that we're referencing
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			}
		);

		await queryInterface.addColumn(
			"Actions", // name of Source table
			"organiser_id", // name of the key we're adding
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
			"Requirements", // name of Source table
			"action_id", // name of the key we're adding
			{
				type: Sequelize.INTEGER,
				references: {
					model: "Actions", // name of Target table
					key: "id", // key in Target model that we're referencing
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			}
		);
	},

	async down(queryInterface, Sequelize) {
		// await queryInterface.removeColumn(
		// 	"Volunteerships", // name of Source model
		// 	"user_id" // key we want to remove
		// );

		await queryInterface.removeColumn(
			"Actions", // name of Source model
			"organiser_id" // key we want to remove
		);
		
		await queryInterface.removeColumn(
			"Requirements", // name of Source model
			"action_id" // key we want to remove
		);

		await queryInterface.removeColumn(
			"Volunteerships", // name of Source model
			"requirement_id" // key we want to remove
		);

		await queryInterface.removeColumn(
			"Volunteerships", // name of Source model
			"user_id" // key we want to remove
		);
	},
};
