const mongoose = require('mongoose');
const Profile = require('../models//Profile');
const connect = require('../services/db')

const ProfileController = {
  create: async (req, res) => {
    // Logic for creating a new user goes here
    try {
        const userprofile = await new Profile(req.body);
        userprofile.save().then(userprofile=>{
          res.json(userprofile)
        }).catch(err=>{
          res.json(err)
        })
    } catch (error) {
        res.json(error);
    }
   
  },

  index: async (req, res) => {
    try {
        await Profile.find((err, users) => {
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
        
        await Profile.findById(req.params.id).then(user=>{
            if(!user) 
                res.json("Profile Not Found");
            return res.json(user);
        }).catch(err=>{
            res.json(err)
        });
    } catch (error) {
        res.json(error)
    }
  },

  update: async (req, res) => {
    // Logic for updating a user goes here
try {
    
    await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
         if (err) {
           res.status(500).send(err);
         } else if (!user) {
           res.status(404).send("Profile not found");
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
        await Profile.findByIdAndDelete(req.params.id).then(profile=>{
            if(!profile)
                res.status(404).send("Profile not found");
             else
               res.json(profile);
          }).catch(err=>{
            res.json(err);
          });
    } catch (error) {
        res.json(error)
    }
  }
};

module.exports = ProfileController;


