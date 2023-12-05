var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");
const { Model } = require("sequelize");

function userShouldBeLoggedIn(req, res, next) {
	const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");
	if (!token) {
		res.status(401).send({ message: "please provide a token" });
	} else {
		jwt.verify(token, supersecret, async function (err, decoded) {
			if (err) res.status(401).send({ message: err.message });
			else {
				//everything is awesome
				req.user = await models.User.findOne({
					where: { id: decoded.user_id },
					include: models.Keyword,
				});

				next();
			}
		});
	}
}

module.exports = userShouldBeLoggedIn;
