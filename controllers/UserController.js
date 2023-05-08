const mongoose = require('mongoose');
const User = require('../models/User');
const connect = require('../services/db')

const UserController = {
  create: async (req, res) => {
    // Logic for creating a new user goes here
    try {
        const newUser = await new User(req.body);
        newUser.save().then(newUser=>{
          res.json(newUser)
        }).catch(err=>{
          res.json(err)
        })
    } catch (error) {
        res.json(error);
    }
   
    
  },

  index: async (req, res) => {
    try {
        await User.find((err, users) => {
             if (err) {
               res.status(500).send(err);
             } else {
               res.json(users);
             }
        });
    } catch (error) {
        res.json(error);
    }
  },

  show: async (req, res) => {
    try {
        
        await User.findById(req.params.id, (err, user) => {
            if (err) {
              res.status(500).send(err);
            } else if (!user) {
              res.status(404).send("User not found");
            } else {
              res.json(user);
            }
          });
    } catch (error) {
        res.json(error)
    }
  },

  update: async (req, res) => {
    // Logic for updating a user goes here
try {
    
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
         if (err) {
           res.status(500).send(err);
         } else if (!user) {
           res.status(404).send("User not found");
         } else {
           res.json(user);
         }
       });
} catch (error) {
    res.json(error)
}
  },

  delete:async (req, res) => {
    // Logic for deleting a user goes here
    try {
        await User.findByIdAndDelete(req.params.id, (err, user) => {
             if (err) {
               res.status(500).send(err);
             } else if (!user) {
               res.status(404).send("User not found");
             } else {
               res.json(user);
             }
           });
    } catch (error) {
        res.json(error)
    }
  }
};

module.exports = UserController;


