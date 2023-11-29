var express = require("express");
var router = express.Router();
const models = require("../models");
const { Model } = require("sequelize");

require("dotenv").config();

//GET 

router.get("/get", function (req, res, next) {
  
  models.preferences.findAll()
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

//POST

router.post("/post", async function (req, res, next) {
  const { userId, keywordId } = req.body;
  try {
    // const hash = await bcrypt.hash(password, saltRounds);
    console.log("Request Body:", req.body);

    const preferencesInfo = await models.preferences.create({
      userId,
      keywordId
    });

    console.log(preferencesInfo)
    res.send("Preferences succesful");

  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;