const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");

// create an action
router.post("/", async (req, res) => {
	try {
		const {
			online,
			in_person,
			start_time,
			end_time,
			is_group,
			name,
			description,
			online_link,
			latitude,
			longitude,
		} = req.body;

		const newAction = await models.Action.create({
			online,
			in_person,
			start_time,
			end_time,
			is_group,
			name,
			description,
			online_link,
			latitude,
			longitude,
		});
		res.status(201).send({ message: "Action created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// get all actions by a specific keyword_id
router.get("/", async (req, res) => {
	try {
		const keyword_id = req.query.keyword_id; // get keyword from req

		const actions = await models.Action.findAll({
			where: {
				Keyword: keyword_id,
			},
			include: [
				{
					model: models.Keyword,
					where: {
						id: keyword_id,
					},
				},
			],
		});

		res.send(actions);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// get all info of action by action_id
router.get("/:action_id", async (req, res) => {
	const action_id = req.params.action_id;
	try {
		const action = await models.Action.findAll({
			where: {
				id: action_id,
			},
			// include: {
			// 	model: models.Keyword,
			// 	where: {
			// 		id: keyword_id,
			// 	},
			// },
		});
		res.send(action);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

module.exports = router;
