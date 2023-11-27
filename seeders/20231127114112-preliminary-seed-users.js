'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      { userName: "Parker",
      password: "$2b$10$Bym51guK29a2S/myR0d2a.addHBl6Hqh90F8tJ7Uc4kuuetgG5zhq",
      organisation: false,
      longitude: 41.395087281773236, 
      latitude: 2.17561034824358,
      createdAt: new Date(),
      updatedAt: new Date() },
      { userName: "Meyer",
      password: "$2b$10$SJI7xobIjznyHVuzyZFLj.LornvbhEWQSHlfGpGfCzMCpVR/QDVIa",
      organisation: false,
      longitude: 41.40440245613667,  
      latitude: 2.185675096973694,
      createdAt: new Date(),
      updatedAt: new Date() },
      { userName: "Jasper",
      password: "$2b$10$pTyRHTO0ZJ0i0gCpjoOQyun5WZQZvBT9Jnr7KB6fWXTbq5UOJDOq2",
      organisation: false,
      longitude: 41.38090587280172, 
      latitude: 2.1230949898268063 ,
      createdAt: new Date(),
      updatedAt: new Date() },
      { userName: "Jackson",
      password: "$2b$10$yz.CEhiRhA8sDh4myKt4j.uBzhCG.s/PtTuUJngHU4Mpi8NjvjrJi",
      organisation: true,
      longitude: 41.387057447295895,  
      latitude: 2.1700522772338617,
      createdAt: new Date(),
      updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", {[Sequelize.Op.or]: [
      {password: "$2b$10$Bym51guK29a2S/myR0d2a.addHBl6Hqh90F8tJ7Uc4kuuetgG5zhq"},
      {password: "$2b$10$SJI7xobIjznyHVuzyZFLj.LornvbhEWQSHlfGpGfCzMCpVR/QDVIa"},
      {password: "$2b$10$pTyRHTO0ZJ0i0gCpjoOQyun5WZQZvBT9Jnr7KB6fWXTbq5UOJDOq2"},
      {password: "$2b$10$yz.CEhiRhA8sDh4myKt4j.uBzhCG.s/PtTuUJngHU4Mpi8NjvjrJi"}
    ]});
  },
};
