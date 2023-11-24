"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			organisation: {
				type: Sequelize.BOOLEAN,
			},
			longitude: {
				type: Sequelize.FLOAT,
			},
			latitude: {
				type: Sequelize.FLOAT,
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

		//  creates  a foreign key reference in the Users table
		await queryInterface.addColumn("Volunteers", "user_id", {
			type: Sequelize.INTEGER,
			references: {
				model: "Users",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		// removes the foreign key column in the down method
		// await queryInterface.removeColumn("Volunteers", "user_id");
		await queryInterface.dropTable("Users");
	},
};
