const express = require('express');
const { 
    signUpUser, 
    loginUser,
    getUserByID,
    updateUserProfileByID
} = require("../controllers/user.controller")

const { checkToken } = require('../auth/tokern_validation');
const router = express.Router();
router.use(express.json());

//routers
router.post('/users/register', signUpUser);
router.post('/user/login', loginUser);
router.put('/profile/:id', checkToken, updateUserProfileByID);
router.get('/profile/:id', checkToken, getUserByID);

module.exports = router;