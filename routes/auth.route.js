const express = require('express');
const router = express.Router();

const {registerUser, loginUser, idUser} = require('../controllers/auth.controller');

router.post('/register', registerUser)//Route for registering a user
router.post('/login', loginUser)//Route for logging in user
router.post('/id', idUser)//Route for to identify a user when adding an appointment to send user and token in response with new appointments added to the user

module.exports = router;