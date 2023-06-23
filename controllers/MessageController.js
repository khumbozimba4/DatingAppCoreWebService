const mongoose = require('mongoose');
const Message = require('../models/Message');
const connect = require('../services/db')
const io = require('./sockets/socket') 



const MessageController = {
    create: async (req, res) => {
        // Logic for creating a new message goes here
        try {
            const message = await new Message(req.body);
            message.save().then(message=>{
              res.json(message)
              //emit message from server throgh socket to client quickly
              io.emit('messageToRoom', message);
              res.status(200);

            }).catch(err=>{
              res.status(500)
              res.json(err)
            })
        } catch (error) {
            res.json(error);
        }
       
      },

    Index: async (req,res)=>{
        try {
            await Message.find((err, messages) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.json(messages);
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
        
        await Message.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, message) => {
             if (err) {
               res.status(500).send(err);
             } else if (!message) {
               res.status(404).send("Message not found");
             } else {
               res.json(message);
             }
           });
    } catch (error) {
        res.json(error)
    }
      },
    
      delete:async (req, res) => {
        // Logic for deleting a user goes here
        try {
            await Message.findByIdAndDelete(req.params.id, (err, message) => {
                 if (err) {
                   res.status(500).send(err);
                 } else if (!message) {
                   res.status(404).send("Message not found");
                 } else {
                   res.json(message);
                 }
               });
        } catch (error) {
            res.json(error)
        }
      },

   
// Retrieve messages for a specific DM
    GetDmMessages: async (req, res) => {
        try {
            const dmId = req.params.dmId;
            const ownerId = req.user._id; // Assuming the owner is authenticated and the user object is available in the request

            const messages = await Message.find({
            $or: [
                { senderId: ownerId, receiverId: dmId },
                { senderId: dmId, receiverId: ownerId }
            ]
            }).sort({ timestamp: 1 });

            res.json(messages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
        }
    };
    
    module.exports = MessageController;
    