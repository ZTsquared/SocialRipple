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
				keywordId: 6,
				actionId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 2,
				actionId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 4,
				actionId: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 5,
				actionId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 9,
				actionId: 6,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 6,
				actionId: 7,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 4,
				actionId: 8,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 6,
				actionId: 8,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 10,
				actionId: 9,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 6,
				actionId: 9,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 3,
				actionId: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 1,
				actionId: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 8,
				actionId: 11,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 7,
				actionId: 12,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 10,
				actionId: 12,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 9,
				actionId: 13,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 3,
				actionId: 13,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 8,
				actionId: 14,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 6,
				actionId: 15,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 1,
				actionId: 16,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 6,
				actionId: 17,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 2,
				actionId: 18,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 4,
				actionId: 19,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 5,
				actionId: 20,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 9,
				actionId: 21,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 6,
				actionId: 22,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 4,
				actionId: 23,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 6,
				actionId: 23,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 10,
				actionId: 24,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 6,
				actionId: 24,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 3,
				actionId: 25,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 1,
				actionId: 25,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 8,
				actionId: 26,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 7,
				actionId: 27,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				keywordId: 10,
				actionId: 27,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 9,
				actionId: 28,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 3,
				actionId: 28,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 8,
				actionId: 29,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keywordId: 6,
				actionId: 30,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Actions_Keywords", null, {});
	},
};
