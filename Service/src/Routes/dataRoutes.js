const express = require('express')
const dataController = require('../Controllers/dataController')
const { showData, deleteData, getAllData, createData } = dataController

const router = express.Router()

router.post('/show', showData)

router.post('/delete', deleteData)

router.get("/get", getAllData)

router.get('/create', createData)

module.exports = router