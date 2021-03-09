require("dotenv").config();
const express = require("express");
const router = express.Router();
const video = require("../models/video");
const multer = require("multer");
var AWS = require("aws-sdk");


module.exports = router;