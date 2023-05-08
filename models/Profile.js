const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      bio: {
        type: String
      },
      interests: [{
        type: String
    }],
    location: {type:String,required:true},
    education: {
        school: {
          type: String
        },
        degree: {
          type: String
        },
        fieldOfStudy: {
          type: String
        },
        graduationYear: {
          type: Number
        }
      },
    pictures: [{
        type: String
      }],

    hobbies: [{
        name: {
          type: String
        },
        description: {
          type: String
        }
      }],
      matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
      createdAt: {
        type: Date,
        default: Date.now
      },
   

});
const User = mongoose.model('User', profileSchema);

module.exports = User;
