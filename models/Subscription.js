const mongoose = require('mongoose');

// Define the SubscriptionPlan schema
const subscriptionPlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true
  },
  features: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  additionalDetails: {
    type: String
  }
});

// Create the SubscriptionPlan model
const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

module.exports = SubscriptionPlan;
