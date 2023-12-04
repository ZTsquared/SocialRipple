'use strict';
const models = require("../models/index")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   const users = [
      { username: "Zia",
      password: "Zia",
      organisation: false,
      city: "barcelona",
      latitude: 41.457978510406264, 
      longitude: 2.065658393392965,
      createdAt: new Date(),
      updatedAt: new Date() },
      { username: "Claire",
      password: "Claire",
      organisation: false,
      city: "barcelona",
      latitude: 41.40440245613667,  
      longitude: 2.185675096973694,
      createdAt: new Date(),
      updatedAt: new Date() },
      { username: "Judit",
      password: "Judit",
      organisation: false,
      city: "terrassa",
      latitude: 41.56081273814943,  
      longitude: 2.002370817517756,
      createdAt: new Date(),
      updatedAt: new Date() },
      { username: "Carol",
      password: "Carol",
      organisation: true,
      city: "barcelona",
      latitude: 41.387057447295895,  
      longitude: 2.1700522772338617,
      createdAt: new Date(),
      updatedAt: new Date() }
    ];
    
    // users.forEach(u => User.create(u))
    await models.User.bulkCreate(users)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", {[Sequelize.Op.or]: [
      {username: "Zia"},
      {username: "Claire"},
      {username: "Judit"},
      {username: "Carol"}
    ]});
  },
};





// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {

//     await queryInterface.bulkInsert('Users', [
//       { username: "Zia",
//       password: "Zia",
//       organisation: false,
//       longitude: 41.457978510406264, 
//       latitude: 2.065658393392965,
//       createdAt: new Date(),
//       updatedAt: new Date() },
//       { username: "Claire",
//       password: "Claire",
//       organisation: false,
//       longitude: 41.40440245613667,  
//       latitude: 2.185675096973694,
//       createdAt: new Date(),
//       updatedAt: new Date() },
//       { username: "Judit",
//       password: "Judit",
//       organisation: false,
//       longitude: 41.38090587280172, 
//       latitude: 2.1230949898268063 ,
//       createdAt: new Date(),
//       updatedAt: new Date() },
//       { username: "Carol",
//       password: "Carol",
//       organisation: true,
//       longitude: 41.387057447295895,  
//       latitude: 2.1700522772338617,
//       createdAt: new Date(),
//       updatedAt: new Date() }
//     ], {});
//   },

//   async down(queryInterface, Sequelize) {
//     return queryInterface.bulkDelete("Users", {[Sequelize.Op.or]: [
//       {username: "Zia"},
//       {username: "Claire"},
//       {username: "Judit"},
//       {username: "Carol"}
//     ]});
//   },
// };
