const {webCookieValidator, loginValidator} = require("../../middleware/authentication");
const router = require('express').Router();
const clientRouter = require("./client");
const Clients = require("../../database/models/clients");