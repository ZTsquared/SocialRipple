var express = require("express");
var router = express.Router();
const models = require("../models");

const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const users = require("../models/user")

//GET

router.post("/", async function (req, res, next) {
  
    await NodeList.Preferences.create({
      // username: 'alice123',
      // isAdmin: true
    }, { fields: ['username'] });
});

//POST

module.exports = router;
