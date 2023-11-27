require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    seederStorage: "sequelize", //<--allows for storage of seeding history
    seederStorageTableName: "sequelize_data" //<---allows for storage of seeding history
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    seederStorage: "sequelize", //<--allows for storage of seeding history
    seederStorageTableName: "sequelize_data" //<---allows for storage of seeding history
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    seederStorage: "sequelize", //<--allows for storage of seeding history
    seederStorageTableName: "sequelize_data" //<---allows for storage of seeding history
  },
};
