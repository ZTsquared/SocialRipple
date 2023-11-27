var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const saltRounds = 10;
var bcrypt = require("bcrypt");

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

//GET

router.get("/", async function (req, res, next) {
  try {
    const userInfo = await models.User.findAll({
      attributes: ["username", "organisation", "latitude", "longitude"],
      where: { id },
    });
    res.send(userInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/preferences", async function (req, res, next) {
  try {
    const keywords = await models.User.findOne({
      where: {
        id,
      },
      include: models.Keyword,
    });
    res.send(keywords);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST

router.post("/register", async function (req, res, next) {
  const { password } = req.body; // is this right ?
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const userInfo = await models.User.create({
      username,
      password: hash,
      organisation,
      latitude,
      longitude,
    });
    //how do i add to preference, its a junction table
    await models.Preference.create({
      Keywords,
    });
    res.send(userInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
