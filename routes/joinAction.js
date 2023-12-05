var express = require("express");
var router = express.Router();
const models = require("../models");
const { Op, Association } = require("sequelize");

router.post("/", async function (req, res) {
  const { userId, requirementId } = req.body;
  try {
    console.log("joinAction");
    console.log(userId, requirementId);

    const volunteershipInfo = await models.Volunteership.create({
      userId,
      requirementId,
      completed: 0,
    });

    // console.log(volunteershipInfo);
    res.send("volunteership created");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
