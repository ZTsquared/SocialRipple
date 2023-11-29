"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Volunteerships", [
			{
				userId: 1,
				requirementId: 1,
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 1,
				requirementId: 5,
				completed: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				requirementId: 1,
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				requirementId: 2,
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				requirementId: 4,
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				requirementId: 2,
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				requirementId: 5,
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				requirementId: 1,
				completed: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Volunteerships", null, {});
	},
};
