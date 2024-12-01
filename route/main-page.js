const express = require('express')
const router = express.Router()
const mainPageController = require('../controllers/main-page')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/', mainPageController.mainPage)

module.exports = router
