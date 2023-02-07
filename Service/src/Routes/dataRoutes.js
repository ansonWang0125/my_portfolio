const express = require('express')
const dataController = require('../Controllers/dataController')
const { showData, deleteData } = dataController

const router = express.Router()

router.post('/show', showData)

router.post('/delete', deleteData)

module.exports = router