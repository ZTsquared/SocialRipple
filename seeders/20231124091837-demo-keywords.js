"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Keywords", [
      { keyword: "Food",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Media",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Sports",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Literature",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Dating",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Awareness",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Music",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Arts&Crafts",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Nature",
      createdAt: new Date(),
      updatedAt: new Date() },
      { keyword: "Nightlife",
      createdAt: new Date(),
      updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Keywords", {[Sequelize.Op.or]:[
      {keyword: "Food"}, 
      {keyword: "Media"}, 
      {keyword: "Sports"}, 
      {keyword: "Literature"}, 
      {keyword: "Dating"}, 
      {keyword: "Awareness"},
      {keyword: "Music"},
      {keyword: "Arts&Crafts"},
      {keyword: "Nature"},
      {keyword: "Nightlife"},
    ]});
  },
};
