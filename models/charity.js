const mongoose = require('mongoose')

const charitySchema = new mongoose.Schema(
  {
    charityName: { type: String, required: true },
    RegistrationID: { type: String, required: true },
    Approved: { type: Boolean, default: 'false' },
    Location: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    PhoneNumber: { type: Number, required: true },
    balance: { type: Number, required: true, default: 0 },
    campaignId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Charity = mongoose.model('Charity', charitySchema)

module.exports = Charity
