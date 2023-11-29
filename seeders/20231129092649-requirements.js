"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Requirements", [
			{
				description:
					"Collect meat and vegetables donated from Carrer Vila i Vila 2 and bring to BBQ at 11h.",
				actionID: 1,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Cook meat on BBQ",
				actionID: 1,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the movie.",
				actionID: 2,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Distribute the popcorn during the movie.",
				actionID: 2,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the movie.",
				actionID: 2,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description:
					"Arrive at the park 15mins before the walk to welcome walkers",
				actionID: 6,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Requirements", {
			actionID: [1, 2, 6],
		});
	},
};
