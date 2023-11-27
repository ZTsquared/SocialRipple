'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      { userName: "Zia",
      password: "Zia",
      organisation: false,
      longitude: 41.457978510406264, 
      latitude: 2.065658393392965,
      createdAt: new Date(),
      updatedAt: new Date() },
      { userName: "Claire",
      password: "Claire",
      organisation: false,
      longitude: 41.40440245613667,  
      latitude: 2.185675096973694,
      createdAt: new Date(),
      updatedAt: new Date() },
      { userName: "Judit",
      password: "Judit",
      organisation: false,
      longitude: 41.38090587280172, 
      latitude: 2.1230949898268063 ,
      createdAt: new Date(),
      updatedAt: new Date() },
      { userName: "Carol",
      password: "Carol",
      organisation: true,
      longitude: 41.387057447295895,  
      latitude: 2.1700522772338617,
      createdAt: new Date(),
      updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", {[Sequelize.Op.or]: [
      {userName: "Zia"},
      {userName: "Claire"},
      {userName: "Judit"},
      {userName: "Carol"}
    ]});
  },
};
