const express = require('express')
const envController = require('../Controllers/envController')
const { getEnv } = envController

const router = express.Router()

router.post('/getenv', getEnv)

module.exports = router