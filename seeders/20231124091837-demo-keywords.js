"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Keywords", [
      { keyword: "Food" },
      { keyword: "Media" },
      { keyword: "Sports" },
      { keyword: "Literature" },
      { keyword: "Dating" },
      { keyword: "Awareness" },
      { keyword: "Music" },
      { keyword: "Arts&Crafts" },
      { keyword: "Nature" },
      { keyword: "Nightlife" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Keywords", null, {});
  },
};
