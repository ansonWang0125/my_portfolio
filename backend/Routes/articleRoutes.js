//importing modules

const express = require('express')
const articleController = require('../Controllers/articleController')
const {saveArticle, createArticle, postArticle, showArticle, mainShowArticle, searchArticle, myShowArticle, mySearchArticle, deleteArticle} = articleController
const userAuth = require('../Middleware/userAuth')
const articleAuth = require('../Middleware/articleAuth')

const router = express.Router()

router.post('/save', userAuth.checkToken, articleAuth.saveArticle, saveArticle)
router.post('/create', userAuth.checkToken, articleAuth.createArticle,createArticle)
router.post('/post', postArticle)
router.post('/show', showArticle)
router.post('/search', searchArticle)
router.post('/mainShow', mainShowArticle)
router.post('/myShow', userAuth.checkToken, myShowArticle)
router.post('/mySearch', userAuth.checkToken, mySearchArticle)
router.post('/delete', userAuth.checkToken, deleteArticle)



module.exports = router