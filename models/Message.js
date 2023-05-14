const mongoose = require('mongoose');
// Create a Mongoose schema for the "messages" collection
const messageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
    unique: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there is a "User" collection with user information
    required: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived', 'deleted'],
    default: 'unread'
  },
  attachments: {
    type: [String], // Array of strings
    default: []
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;