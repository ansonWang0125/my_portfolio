const express = require('express')
const imageController = require('../Controllers/imageController')
const { uploadImage, getImage } = imageController
const upload = require('../Config/multerConfig')

const router = express.Router()

router.post('/upload', upload.single('file'), uploadImage)

router.get('/get/:id', getImage)

module.exports = router