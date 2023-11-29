"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Actions_Keywords", [
			{
				keywordId: 1,
				actionId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 1,
				actionId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 2,
				actionId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 3,
				actionId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 5,
				actionId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 4,
				actionId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Actions_Keywords", null, {});
	},
};
