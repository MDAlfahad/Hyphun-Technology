const express = require("express");
const cors = require("cors");
const multer = require("multer");
const db = require("../db");
const id = require("uuid");

const app = express();
app.use(cors());
app.use(multer());
