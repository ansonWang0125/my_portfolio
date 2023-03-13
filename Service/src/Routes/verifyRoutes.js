const express = require('express')
const verifyController = require('../Controllers/verifyController')
const { verify } = verifyController

const router = express.Router()

router.post('/verifypw', verify)

module.exports = router