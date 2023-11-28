var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const saltRounds = 10;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const models = require("../models");
const { Model } = require("sequelize");
const supersecret = process.env.SUPER_SECRET;
require("dotenv").config();

router.post("/register", async function (req, res, next) {
  const { username, password, organisation, latitude, longitude } = req.body;
  try {
    // const hash = await bcrypt.hash(password, saltRounds);
    console.log("Request Body:", req.body);
    const userInfo = await models.User.create({
      username,
      password,
      organisation,
      longitude,
      latitude,
    });
    await models.Preference.create({
      Keywords,
    });
    res.send("Register succesful");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    // console.log(username);
    const user = await models.User.findOne({
      where: { username },
    });

    if (user) {
      console.log(user);
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id: user.id }, supersecret);
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