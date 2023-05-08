const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String,required: true,unique: true },
  phone_number: {type:String,require:true, unique:true},
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
 
  gender: {
           type:String,
           required:true,  
            enum: ['Male', 'Female', 'Other'],
},
  otp: { type: String },
  otp_verified:{type: Boolean}
});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  });
  

  
  userSchema.methods.comparePassword =  (candidatePassword, cb)=> {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
const User = mongoose.model('User', userSchema);

module.exports = User;
