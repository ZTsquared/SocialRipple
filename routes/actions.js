const express = require("express");
const router = express.Router();
const { Model } = require("sequelize");
const { Op } = require("sequelize");
const models = require("../models");

// get all actions that have a specific keyword
app.get("/actions", async (req, res) => {
	try {
		const keyword_id = req.query.keyword_id; // get keyword from req

		const actions = await models.Actions.findAll({
			where: {
				Keyword: keyword_id,
			},
			// include: [
			// 	{
			// 		model: models.Keyword,

			// 		where: {
			// 			keyword_id,
			// 		},
			// 	},
			// ],
		});

		res.send(actions);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});
