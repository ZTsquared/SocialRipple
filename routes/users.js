
var express = require("express");
var router = express.Router();

const models = require("../models");

const { Op } = require("sequelize");
const saltRounds = 10;
var bcrypt = require("bcrypt");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const users = require("../models/user")

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
    });
    const preferences = await user.getKeywords();
    res.send(preferences, user);
  } catch (error) {
    res.status(500).send(error);
  }

});

//POST

// ADDING preferences to your own profile
router.post(
  "/profile/preferences",
  userShouldBeLoggedIn,
  async function (req, res, next) {
    try {
      keywordInstance.addUser(1, 1);
      const user = await models.User.findOne({
        where: { id },
      });
      const preferences = await user.getKeywords();
      res.send(preferences);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
