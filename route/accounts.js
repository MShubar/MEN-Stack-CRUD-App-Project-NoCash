const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accounts')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/sign-up', accountController.signUp)
router.post('/sign-up', accountController.newAccount)
router.get('/sign-in', accountController.signIn)
router.post('/sign-in', accountController.signingIn)
router.get('/sign-out', isSignedIn, accountController.signOut)
router.get('/logged-In', isSignedIn, accountController.loggedIn)

module.exports = router
