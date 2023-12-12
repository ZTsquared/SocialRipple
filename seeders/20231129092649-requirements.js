"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Requirements", [
			{
				description: "Collect meat and vegetables",
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
				description: "Bring plates and cutlery",
				actionID: 1,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the movie",
				actionID: 2,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Distribute the popcorn during the movie",
				actionID: 2,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the movie",
				actionID: 2,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Read the article when you want! ",
				actionID: 3,
				capacity: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Go to the store on when you want!",
				actionID: 4,
				capacity: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the event",
				actionID: 5,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 5,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Welcome walkers at our starting point",
				actionID: 6,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Give water to the walkers at the end",
				actionID: 6,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the event",
				actionID: 7,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 7,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the event",
				actionID: 8,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 8,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Hang posters to promote the event",
				actionID: 9,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange table with food and refreshments",
				actionID: 9,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Set up the net",
				actionID: 10,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Manage the whatsapp group to organise food",
				actionID: 10,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Set up picnic area on the beach",
				actionID: 10,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Collect supplies for the evening",
				actionID: 11,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the event",
				actionID: 11,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 11,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Manage the whatsapp group",
				actionID: 12,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Set up the food table",
				actionID: 12,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Manage the whatsapp group",
				actionID: 13,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Distribute water",
				actionID: 13,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Collect the supplies",
				actionID: 14,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Arrange the chairs in the space before the event",
				actionID: 14,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 14,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Arrange the chairs in the space before the event",
				actionID: 15,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 15,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Collect meat and vegetables",
				actionID: 16,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Cook meat on BBQ",
				actionID: 16,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Bring plates and cutlery",
				actionID: 16,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the movie",
				actionID: 17,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Distribute the popcorn during the movie",
				actionID: 17,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the movie",
				actionID: 17,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Read the article when you want! ",
				actionID: 18,
				capacity: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Go to the store on when you want!",
				actionID: 19,
				capacity: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Arrange the chairs in the space before the event",
				actionID: 20,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 20,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Welcome walkers at our starting point",
				actionID: 21,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Give water to the walkers at the end",
				actionID: 21,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the event",
				actionID: 22,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 22,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the event",
				actionID: 23,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 23,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Hang posters to promote the event",
				actionID: 24,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange table with food and refreshments",
				actionID: 24,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Set up the net",
				actionID: 25,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Manage the whatsapp group to organise food",
				actionID: 25,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Set up picnic area on the beach",
				actionID: 25,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Collect supplies for the evening",
				actionID: 26,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Arrange the chairs in the space before the event",
				actionID: 26,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 26,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Manage the whatsapp group",
				actionID: 27,
				capacity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Set up the food table",
				actionID: 27,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Manage the whatsapp group",
				actionID: 28,
				capacity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Distribute water",
				actionID: 28,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Collect the supplies",
				actionID: 29,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Arrange the chairs in the space before the event",
				actionID: 29,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 29,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				description: "Arrange the chairs in the space before the event",
				actionID: 30,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				description: "Tidy the chairs in the space after the event",
				actionID: 30,
				capacity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Requirements", null, {});
	},
};
