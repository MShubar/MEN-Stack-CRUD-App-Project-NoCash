const express = require('express')
const router = express.Router()
const campaignController = require('../controllers/campaigns')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', campaignController.newCampaign)
router.post('/new', campaignController.createCampaign)
router.get('/list', campaignController.listCampaign)
router.get('/charity-campaign', campaignController.listCampaign)
router.get('/:id', campaignController.viewCampaign)
router.post('/:id/donate', campaignController.donateCampaign)
router.get('/edit/:id', campaignController.editCampaignForm)
router.post('/edit/:id', campaignController.editCampaign)

router.post('/delete/:id', campaignController.deleteCampaign)

module.exports = router
