"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			organisation: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			longitude: DataTypes.NUMBER,
			latitude: DataTypes.NUMBER,
			// freezeTableName: true,
			// instanceMethods: {
			// 	generateHash(password) {
			// 		return bcrypt.hash(password, bcrypt.genSaltSync(8));
			// 	},
			// 	validPassword(password) {
			// 		return bcrypt.compare(password, this.password);
			// 	}
			// }
		},
		{
			hooks: {
				beforeCreate: (user) => {
					const salt = bcrypt.genSaltSync(saltRounds);
					user.password = bcrypt.hashSync(user.password, salt);
				  }
			  },
			sequelize,
			modelName: "User",
		}
		
	);
	// User.beforeCreate((user, options) => {
	// 	return bcrypt.hash(user.password, 10)
	// 		.then(hash => {
	// 			user.password = hash;
	// 		})
	// 		.catch(err => { 
	// 			throw new Error(); 
	// 		});
	// });
	return User;
};
