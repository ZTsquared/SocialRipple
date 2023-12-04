var express = require("express");
var router = express.Router();
const models = require("../models");
const { Model } = require("sequelize");

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


//the route below does not work properly
// router.post("/post", async function (req, res, next) {
//   const { userId, keywordId } = req.body;
//   try {
//     // const hash = await bcrypt.hash(password, saltRounds);
//     console.log("Request Body:", req.body);

//     const preferencesInfo = await models.preferences.create({
//       userId,
//       keywordId
//     });

//     console.log(preferencesInfo)
//     res.send("Preferences succesful");

//   } catch (error) {
//     res.status(500).send(error);
//   }
// });



module.exports = router;