const express = require('express')
const router = express.Router()
const charityController = require('../controllers/charities')

router.get('/list', charityController.listCharity)
router.get('/sign-up', charityController.signUpCharity)
router.post('/sign-up', charityController.createCharity)
router.get('/sign-in', charityController.signInCharity)
router.post('/sign-in', charityController.signingInCharity)
router.get('/sign-out', charityController.signOut)
router.get('/:id', charityController.viewCharity)

module.exports = router
