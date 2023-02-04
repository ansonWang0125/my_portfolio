const express = require('express');
const router = express.Router();
const upload = require('../../config/multer.config');
 
const fileWorker = require('../Controllers/fileController');
 
router.post('/upload', upload.single("file"), fileWorker.uploadFile);
 
module.exports = router;