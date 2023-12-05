var express = require("express");
var router = express.Router();

const models = require("../models");

const { Op } = require("sequelize");
const saltRounds = 10;
var bcrypt = require("bcrypt");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const users = require("../models/user");

//GET

router.get("/profile", userShouldBeLoggedIn, async function (req, res, next) {
	try {
		res.send(req.user);
	} catch (error) {
		res.status(500).send(error);
	}
});

// GET users info, when viewing their profile (without needing to be logged in)
router.get("/profile/:id", async function (req, res, next) {
	const { id } = req.params;
	try {
		const user = await models.User.findOne({
			attributes: ["username", "organisation"],
			where: { id },
			include: [
				models.Keyword,
				{
					model: models.Requirement,
					attributes: ["id", "name", "description"],
					through: { attributes: ["completed"] },
					include: [
						{ model: models.Action, attributes: ["name", "description"] },
					],
				},
			],
		});
		console.log("hi");
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

//POST
router.post(

	"/profile/volunteerships",
	userShouldBeLoggedIn,
	async function (req, res, next) {
		console.log("passed the guard, with body:");
		console.log(req.body);
		const { requirements } = req.body;
		console.log(requirements);
		const { user } = req;
		try {
			console.log("reached the backend try block");
			const result = await user.addRequirements(requirements, {
				through: { completed: 0 },
			});
			console.log("result is:");

			res.send("Action joined successfully");
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

// ADDING preferences to your own profile
router.put("/profile/preferences", userShouldBeLoggedIn, async (req, res) => {
	try {
		const user = req.user;
		const data = await user.addKeyword(keyword);
		res.send(data);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
