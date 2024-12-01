const Account = require('../models/account')
const bcrypt = require('bcrypt')
const sucMessage = require('../middleware/success-message')

const homePage = async (req, res) => {
  try {
    res.redirect('/account/sign-up')
  } catch (err) {
    console.log(err)
  }
}

const signUp = async (req, res) => {
  try {
    res.render('account/sign-up.ejs')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const newAccount = async (req, res) => {
  try {
    const accountInDatabase = await Account.findOne({
      username: req.body.username
    })
    if (accountInDatabase) {
      return res.send('Username already taken')
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and confirm password must match')
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const name = req.body.name
    req.body.password = hashedPassword
    const account = await Account.create(req.body)
    res.redirect('/account/sign-in')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const signIn = async (req, res) => {
  try {
    res.render('account/sign-in.ejs')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const signingIn = async (req, res) => {
  try {
    const accountInDatabase = await Account.findOne({
      username: req.body.username
    })
    if (!accountInDatabase) {
      return res.send('Login failed, Please try again')
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      accountInDatabase.password
    )
    if (!validPassword) {
      return res.send('Login failed, Please try again')
    }
    req.session.account = {
      username: accountInDatabase.username,
      _id: accountInDatabase._id,
      name: accountInDatabase.name.split(' ')[0],
      balance: accountInDatabase.balance
    }
    res.redirect('/main-page')
  } catch (err) {
    req.session.errMessage = 'Please try again later'
    console.log(err)
  }
}

const signOut = async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
}

const loggedIn = async (req, res) => {
  try {
    res.send(`Welcome to the party ${req.session.account.username}`)
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

module.exports = {
  homePage,
  signUp,
  newAccount,
  signIn,
  signingIn,
  signOut,
  loggedIn
}
