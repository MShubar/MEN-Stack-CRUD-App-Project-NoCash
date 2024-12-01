//require
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()
const port = process.env.PORT || '3000'
const session = require('express-session')
const path = require('path')

//middleware require
const accountController = require('./controllers/accounts')
const accountRouter = require('./route/accounts')
const mainPageRouter = require('./route/main-page')
const transactionRouter = require('./route/transactions')
const charityRouter = require('./route/charities')
const campaignRoutes = require('./route/campaigns')
const passAccountToView = require('./middleware/pass-account-to-view')
const passCharityToView = require('./middleware/pass-charity-to-view')
const errorMessage = require('./middleware/error-message')
const sucMessage = require('./middleware/success-message')
const isSignedIn = require('./middleware/is-signed-in')

//middleware
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
)
app.use(express.static('public'))
app.use(passAccountToView)
app.use(passCharityToView)

app.use('/account', accountRouter)
app.use('/main-page', mainPageRouter)
app.use('/transactions', transactionRouter)
app.use('/charity', charityRouter)
app.use('/campaigns', campaignRoutes)
app.use(errorMessage)
app.use(sucMessage)

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connection to MongoDB ${mongoose.connection.name}`)
})

//listener
app.listen(port, () => {
  console.log(`Listening on Localhost:${port}`)
})

app.get('/', accountController.homePage)
