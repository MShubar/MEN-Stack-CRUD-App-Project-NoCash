const Charity = require('../models/charity')
const Campaign = require('../models/campaign')

const bcrypt = require('bcrypt')

const listCharity = async (req, res) => {
  try {
    const charityList = await Charity.find()

    res.render('charity/list-charity.ejs', {
      charity: charityList,
      account: req.session.account
    })
  } catch (err) {
    console.log(err)
  }
}

const viewCharity = async (req, res) => {
  try {
    const charityId = req.params.id
    const charity = await Charity.findById(charityId)
    const campaigns = await Campaign.find({ charityId: charityId })

    res.render('charity/view-charity.ejs', {
      charity,
      campaigns
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
}

const signUpCharity = async (req, res) => {
  try {
    res.render('charity/sign-up-charity.ejs')
  } catch (err) {
    console.log(err)
  }
}

const createCharity = async (req, res) => {
  try {
    const charityInDatabase = await Charity.findOne({
      CharityName: req.body.charityName
    })
    if (charityInDatabase) {
      return res.send('Username already taken')
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and confirm password must match')
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const charity = await Charity.create(req.body)
    res.redirect('/charity/sign-in')
  } catch (err) {
    console.log(err)
  }
}

const signInCharity = async (req, res) => {
  try {
    res.render('charity/sign-in-charity.ejs')
  } catch (err) {
    console.log(err)
  }
}

const signingInCharity = async (req, res) => {
  try {
    const charityInDatabase = await Charity.findOne({
      charityName: req.body.charityName
    })
    if (!charityInDatabase) {
      return res.send('Login failed, Please try again')
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      charityInDatabase.password
    )
    if (!validPassword) {
      return res.send('Login failed, Please try again')
    }

    req.session.charity = {
      charityName: charityInDatabase.charityName,
      balance: charityInDatabase.balance
    }
    req.session.charityId = charityInDatabase._id
    req.session.charityName = charityInDatabase.charityName
    req.session.balance = charityInDatabase.balance

    req.session.successMessage = 'Signed in successfully'
    res.redirect('/main-page')
  } catch (err) {
    req.session.errMessage = 'Please try again later'
    console.log(err)
  }
}

const signOut = async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/main-page')
  } catch (err) {
    console.log(err)
  }
}

const loggedIn = async (req, res) => {
  try {
    res.send(`Welcome to the party ${req.session.account.charity}`)
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

module.exports = {
  listCharity,
  signUpCharity,
  createCharity,
  signInCharity,
  signingInCharity,
  signOut,
  loggedIn,
  viewCharity
}
