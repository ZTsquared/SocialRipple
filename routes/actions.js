const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op, Association } = require("sequelize");

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
      organiserId,
      online_link,
      latitude,
      longitude,
      // keywords,
      //requirements,
    } = req.body;

    const newAction = await models.Action.create(
      {
        online,
        in_person,
        start_time,
        end_time,
        is_group,
        name,
        description,
        organiserId,
        online_link,
        latitude,
        longitude,
        // keywords: [
        // 	{
        // 		keywordId: 9,
        // 		Actions_Keywords: {
        // 			selfGranted: true,
        // 		},
        // 	},
        // ],
      }
      // {
      // 	include: models.Keyword,
      // }
    );

    const actionId = newAction.id;

    // console.log(keywords);

    // for (let keywordId of keywords) {
    // 	await models.Keywords.create({
    // 		include: [],
    // 	});
    // }
    // keywordId, actionId

    res.status(201).send(newAction);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// { message: "Action created successfully", actionId: newAction.id }

// get all actions
router.get("/", async (req, res) => {
  try {
    const action = await models.Action.findAll({
      include: [
        {
          model: models.Keyword,
          attributes: ["id", "keyword"],
          through: {
            attributes: [],
          },
        },

        {
          model: models.Requirement,
          include: [
            {
              model: models.Volunteership,
              attributes: ["id", "completed"],
              include: [
                {
                  model: models.User,
                  attributes: ["id", "username"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.send(action);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// get all info of action by action_id
router.get("/:action_id", async (req, res) => {
  const action_id = req.params.action_id;
  try {
    const action = await models.Action.findOne({
      where: {
        id: action_id,
      },
      include: [
        {
          model: models.Keyword,
          attributes: ["id", "keyword"],
          through: {
            attributes: [],
          },
        },

        {
          model: models.Requirement,
          include: [
            {
              model: models.Volunteership,
              attributes: ["id", "completed"],
              include: [
                {
                  model: models.User,
                  attributes: ["id", "username"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.send(action);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
