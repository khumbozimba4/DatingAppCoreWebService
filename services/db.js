const mongoose = require('mongoose');
const connectionString = 'mongodb://127.0.0.1:27017/meet_people_app';

mongoose.connect(connectionString).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

module.exports = mongoose.connection;
