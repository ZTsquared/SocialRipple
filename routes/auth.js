var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const saltRounds = 10;
var bcrypt = require("bcrypt");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var jwt = require("jsonwebtoken");

router.post("/register", async function (req, res, next) {
  const { password } = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const userInfo = await models.User.create({
      username,
      password: hash,
      organisation,
      latitude,
      longitude,
    });
    await models.Preference.create({
      Keywords,
    });
    res.send(userInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await models.User.finOne({
      where: { username },
    });
    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
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
