const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    donateAmount: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true
  }
)
const Account = mongoose.model('Account', accountSchema)
module.exports = Account
