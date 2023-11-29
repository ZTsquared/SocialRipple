"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Preferences", [
			{
				userId: 1,
				keywordId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 1,
				keywordId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				keywordId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				keywordId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				keywordId: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				keywordId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				keywordId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				keywordId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 4,
				keywordId: 7,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 4,
				keywordId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 4,
				keywordId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				keywordId: 8,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				keywordId: 6,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				keywordId: 9,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				keywordId: 7,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 1,
				keywordId: 9,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 1,
				keywordId: 8,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Preferences", null, {});
	},
};
