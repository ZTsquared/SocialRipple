"use strict";
const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Keyword.belongsToMany(Action, { through: "actions_keywords" });
    }
  }
  Keyword.init(
    {
      keyword: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Keyword",
    }
  );
  return Keyword;
};
