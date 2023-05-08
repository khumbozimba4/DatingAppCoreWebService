const mongoose = require('mongoose');
const User = require('../models/User');
const connect = require('../services/db')
const bcrypt = require('bcrypt');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const AccountController = {

    Authentication: async (req,res)=>{
        
            const phone_number = req.body.phone_number;
            const password  = req.body.password;

            try {
              const user = await User.findOne({ phone_number: phone_number });
              if (!user) {
                return res.status(401).json({ message: 'Invalid Phone Number.' });
              }
          
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                return res.status(401).json({ message: 'Invalid Password.' });
              }
              const secret = process.env.JWT_SECRET;

              const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
              res.json({ token: token });
            } catch (err) {
                console.error(err);
                res.json(err)
            }
    }
}

module.exports = AccountController;