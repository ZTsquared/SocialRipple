"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Volunteership);
			User.belongsToMany(models.Keyword, { through: 'preferences' });
			User.hasMany(models.Action, {foreignKey: 'organiser_id'});
		}
	}
	User.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			organisation: DataTypes.BOOLEAN,
			longitude: DataTypes.NUMBER,
			latitude: DataTypes.NUMBER,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
