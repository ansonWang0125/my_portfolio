const express = require('express')
const { googleOauthHandler, googleOauthSignupHandler } = require('../Controllers/googleAuthController');

const router = express.Router();

router.get('/oauth/google/login', googleOauthHandler);
router.get('/oauth/google/signup', googleOauthSignupHandler);

module.exports = router
