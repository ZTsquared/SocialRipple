"use strict";
const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Action.hasMany(models.Requirement, { foreignKey: "action_id" });
      Action.belongsToMany(models.Keyword, { through: "actions_keywords" });
      //carol: many to many, connects through a table
      Action.belongsTo(models.User);
    }
  }
  Action.init(
    {
      online: DataTypes.BOOLEAN,
      in_person: DataTypes.BOOLEAN,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      is_group: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      // organiser_id: DataTypes.INTEGER,
      online_link: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Action",
    }
  );
  return Action;
};
