const Campaign = require('../models/campaign')
const Charity = require('../models/charity')
const Account = require('../models/account')

const listCampaign = async (req, res) => {
  try {
    const campaignList = await Campaign.find()

    res.render('campaign/list-campaign.ejs', {
      campaign: campaignList,
      account: req.session.account
    })
  } catch (err) {
    console.log(err)
  }
}
const viewCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id

    const campaign = await Campaign.findById(campaignId).populate('charityId')
    if (!campaign) {
      return res.status(404).send('Campaign not found')
    }

    res.render('campaign/view-campaign', {
      campaign,
      charity: campaign.charityId
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
}
const newCampaign = async (req, res) => {
  try {
    res.render('campaign/new-campaign.ejs')
  } catch (err) {
    console.log(err)
  }
}
const createCampaign = async (req, res) => {
  try {
    if (!req.session.charityId) {
      return res.send('You must be logged in as a charity')
    }
    const charityId = req.session.charity
    const campaignInDatabase = await Campaign.findOne({
      campaignName: req.body.campaignName
    })
    if (campaignInDatabase) {
      return res.send('Campaign name already taken')
    }

    const campaign = await Campaign.create({
      ...req.body,
      charityId: req.session.charityId
    })

    res.redirect('/campaigns/list')
  } catch (err) {
    console.log(err)
  }
}
const donateCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id
    const donationAmount = parseFloat(req.body.donateAmount)

    if (isNaN(donationAmount) || donationAmount <= 0) {
      return res.status(400).send('Donation amount must be greater than 0')
    }

    const campaign = await Campaign.findById(campaignId).populate('charityId')
    if (!campaign) {
      return res.status(404).send('Campaign not found')
    }

    if (req.session.account) {
      const account = await Account.findOne({
        username: req.session.account.username
      })

      if (!account || account.balance < donationAmount) {
        return res.status(400).send('Insufficient balance')
      }

      account.balance -= donationAmount
      await account.save()

      req.session.account.balance = account.balance

      campaign.balance += donationAmount
      await campaign.save()

      const charity = campaign.charityId
      charity.balance += donationAmount
      await charity.save()
    } else if (req.session.charity) {
      return res
        .status(400)
        .send('Charities cannot donate to campaigns they own')
    } else {
      return res.status(401).send('Unauthorized donation attempt')
    }

    res.redirect(`/campaigns/${campaignId}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

const editCampaignForm = async (req, res) => {
  try {
    const campaignId = req.params.id

    // Fetch the campaign details
    const campaign = await Campaign.findById(campaignId)
    if (!campaign) {
      return res.status(404).send('Campaign not found')
    }

    res.render('campaign/edit-campaign.ejs', { campaign })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

const editCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id

    // Find and update the campaign with new details
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { ...req.body },
      { new: true, runValidators: true }
    )

    if (!updatedCampaign) {
      return res.status(404).send('Campaign not found')
    }

    res.redirect(`/campaigns/${campaignId}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
const deleteCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id

    // Find and delete the campaign
    const campaign = await Campaign.findByIdAndDelete(campaignId)
    if (!campaign) {
      return res.status(404).send('Campaign not found')
    }

    res.redirect('/campaigns/list')
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
module.exports = {
  listCampaign,
  newCampaign,
  createCampaign,
  donateCampaign,
  viewCampaign,
  editCampaignForm,
  editCampaign,
  deleteCampaign
}
