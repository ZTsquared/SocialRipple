var express = require("express");
var router = express.Router();
const models = require("../models");

const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const users = require("../models/user");

//GET
router.get("/", async function (req, res, next) {
  try {
    console.log("im here");
    const preferences = await models.Preferences.findAll();
    console.log("im also here");
    console.log(preferences);
    res.send(preferences);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post("/", async function (req, res, next) {
//   await NodeList.Preferences.create(
//     {
//       // username: 'alice123',
//       // isAdmin: true
//     },
//     { fields: ["username"] }
//   );
// });

//POST

module.exports = router;
