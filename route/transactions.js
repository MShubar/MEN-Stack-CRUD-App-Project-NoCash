const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactions')

router.get('/new', transactionController.newTransaction)
router.post('/new', transactionController.createTransaction)
router.get('/history', transactionController.transactionHistory)
router.get('/:id', transactionController.transactionDetails)
module.exports = router
