const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
const { Model } = require("sequelize");

//GET

router.get("/profile", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const userInfo = await models.User.findOne({
      attributes: ["username", "organisation", "latitude", "longitude"],
      // where: { id }, do i need this?
    });
    const preferences = await user.getKeywords();
    res.send(preferences);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET users info, when viewing their profile (without needing to be logged in)
router.get("/profile/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      // attributes: ["username", "organisation"],
      where: { id },
    });
    const preferences = await user.getKeywords();
    res.send(preferences);
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
        // attributes: ["username", "organisation"],
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
