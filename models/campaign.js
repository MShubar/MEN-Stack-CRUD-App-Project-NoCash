const mongoose = require('mongoose')

const campaignSchema = new mongoose.Schema(
  {
    campaignName: { type: String, required: true },
    charityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' },
    GoalAmount: { type: Number, required: true },
    description: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true
  }
)

const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign
