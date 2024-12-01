const Account = require('../models/account')
const Transaction = require('../models/transaction')

const transactionHistory = async (req, res) => {
  try {
    const account = req.session.account

    const sentTransactions = await Transaction.find({
      senderAccountId: account._id
    })
      .populate('senderAccountId', 'username')
      .populate('receiverAccountId', 'username')
      .lean()

    const receivedTransactions = await Transaction.find({
      receiverAccountId: account._id
    })
      .populate('senderAccountId', 'username')
      .populate('receiverAccountId', 'username')
      .lean()
    const transactions = [...sentTransactions, ...receivedTransactions]

    res.render('transactions/history', { transactions, account })
  } catch (err) {
    console.log(err)
  }
}

const newTransaction = async (req, res) => {
  try {
    res.render('transactions/new.ejs')
  } catch (err) {
    console.log(err)
  }
}
const createTransaction = async (req, res) => {
  try {
    const { username, amount } = req.body

    const sender = await Account.findById(req.session.account._id)
    const recipient = await Account.findOne({ username })

    if (!recipient) {
      return res.status(404).send('Recipient not found')
    }

    if (sender.balance < amount) {
      return res.status(400).send('Insufficient balance')
    }

    sender.balance -= parseFloat(amount)
    recipient.balance += parseFloat(amount)

    await sender.save()
    await recipient.save()

    const transaction = new Transaction({
      senderAccountId: sender._id,
      receiverAccountId: recipient._id,
      amount
    })
    await transaction.save()
    req.session.account.balance -= amount

    res.redirect('/transactions/history')
  } catch (err) {
    console.log(err)
  }
}

const transactionDetails = async (req, res) => {
  try {
    const transactionId = req.params.id
    const transaction = await Transaction.findById(transactionId)
      .populate('senderAccountId', 'username')
      .populate('receiverAccountId', 'username')
      .lean()

    if (!transaction) {
      return res.status(404).send('Transaction not found')
    }

    res.render('transactions/details', { transaction })
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
}

module.exports = {
  transactionHistory,
  newTransaction,
  createTransaction,
  transactionDetails
}
