"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Volunteership extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Volunteership.belongsTo(models.User);
			Volunteership.belongsTo(models.Requirement);
		}
	}
	Volunteership.init(
		{
			// requirement_id: DataTypes.INTEGER,
			// user_id: DataTypes.INTEGER,
			completed: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Volunteership",
		}
	);
	return Volunteership;
};
