var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const models = require("../models");
const { Model } = require("sequelize");
const supersecret = process.env.SUPER_SECRET;
require("dotenv").config();

router.post("/:id/volunteership", async function (req, res, next) {});
