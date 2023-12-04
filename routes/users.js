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
      include: models.Keyword,
    });
    console.log("hi");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
router.post("/joinAction", userShouldBeLoggedIn, async function (req, res, next) {

  console.log(req.body);
  const { requirements } = req.body;
  console.log(requirements)
  try {
    const thisUserId = req.user.id
    user = await models.User.findOne({
      where: { id: thisUserId }
    });
    console.log("what comes back from shouldBeLoggedIn")
    console.log(user)
    const result = await user.addVolunteership(requirements);
    console.log("result is:")
    console.log(result)
    res.send("Action joined successfully");
  } catch (error) {
    res.status(500).send(error);
  }

});

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
