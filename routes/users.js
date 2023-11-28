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

router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
  try {

    const userInfo = await models.User.findOne({
      attributes: ["username", "organisation", "latitude", "longitude"],
      // where: { id }, do i need this?
    });

    res.send(userInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get(
  "/preferences",
  userShouldBeLoggedIn,
  async function (req, res, next) {
    try {
      const user = await models.User.findOne({
        where: {
          id,
        },
      });
      const preferences = await user.getKeywords();
      res.send(preferences);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.get("/allusers", function (req, res, next) {
  
  models.User.findAll()
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

//POST

module.exports = router;
