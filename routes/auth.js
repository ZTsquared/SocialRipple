var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
// var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var jwt = require("jsonwebtoken");
const models = require("../models");

require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const { Op } = require("sequelize");
const saltRounds = 10;

router.post("/register", async function (req, res, next) {
  
  const { username, password, organisation, latitude, longitude } = req.body;
  try {
    console.log("hola")
    const hash = await bcrypt.hash(password, saltRounds);
    const userInfo = await models.User.create({
      username,
      password: hash,
      organisation,
      latitude,
      longitude,
    });
    const { id } = userInfo.dataValues;
    // await models.Preference.create({
    // 
    // });
    console.log(id)
    res.send(userInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async function (req, res, next) {

  const { username, password } = req.body;
  try {

    const user = await models.User.findOne({
      where: {
        username
      },
    });
    if (user) {
      console.log(user)
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");
      
      let token = jwt.sign(user.dataValues.id, supersecret);
      res.send({
        message: "Login successful, here is your token",
        token,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;