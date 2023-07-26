const express = require("express");
const router = express.Router();
const userMiddleware = require('../middleware/user');
const userController = require('../controllers/user');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/profile', [userMiddleware.validateUser], userController.profile);

module.exports = router;
