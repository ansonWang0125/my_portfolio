//importing modules

const express = require('express')
const userController = require('../Controllers/userController')
const {signup, login} = userController
const userAuth = require('../Middleware/userAuth')

const router = express.Router()

router.post('/signup', userAuth.saveUser, signup)

router.post('/login', login)

router.post('/googleLogin', userAuth.googleAuth)

router.post('/googleSignup', userAuth.googleAuth)



module.exports = router