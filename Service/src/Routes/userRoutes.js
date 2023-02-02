//importing modules

const express = require('express')
const userController = require('../Controllers/userController')
const {signup, login, account, update} = userController
const userAuth = require('../Middleware/userAuth')

const router = express.Router()

router.post('/signup', userAuth.saveUser, signup)

router.post('/login', login)

router.post('/account', userAuth.checkToken, account)

router.post('/update', userAuth.checkToken, update)


module.exports = router