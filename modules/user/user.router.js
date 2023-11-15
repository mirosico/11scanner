const express = require('express');
const usersController = require("./user.controller");
const isAdmin = require('../../middlewares/isAdmin');
const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.post('/setAdmin',isAdmin, usersController.setAdmin);

module.exports = router;
