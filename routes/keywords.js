var express = require("express");
var router = express.Router();
const models = require("../models");

const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const users = require("../models/user")

//GET

router.get("/", function (req, res, next) {
  
  models.Keyword.findAll()
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

//POST

module.exports = router;
