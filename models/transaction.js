const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
  {
    senderAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    receiverAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    amount: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
