//importing modules

const express = require('express')
const articleController = require('../Controllers/articleController')
const {saveArticle, createArticle, postArticle, showArticle, searchArticle} = articleController
const userAuth = require('../Middleware/userAuth')
const articleAuth = require('../Middleware/articleAuth')

const router = express.Router()

router.post('/save', userAuth.checkToken, articleAuth.saveArticle, saveArticle)
router.post('/create', userAuth.checkToken, articleAuth.createArticle,createArticle)
router.post('/post', postArticle)
router.post('/show', showArticle)
router.post('/search', searchArticle)



module.exports = router