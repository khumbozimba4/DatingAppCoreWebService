const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AccountController = require('../controllers/AccountController');
const authMiddleware = require('../middleware/auth_middleware');
const ProfileController = require('../controllers/ProfileController');
const MessageController = require('../controllers/MessageController')
//login routes
router.post('/login',AccountController.Authentication);
//create user account route
router.post('/users', UserController.create);

//securing other routes using a middleware
router.use(authMiddleware.verifyToken);
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);
 
//profile route
router.get('/profiles', ProfileController.index);
router.get('/profiles/:id', ProfileController.show);
router.put('/profiles/:id', ProfileController.update);
router.delete('/profiles/:id', ProfileController.delete);



router.get('/messages', MessageController.GetDmMessages);
router.get('/messages/:id',  MessageController.show);
router.put('/messages/:id',  MessageController.update);
router.delete('/messages/:id',  MessageController.delete);
router.delete('/messages/:id',  MessageController.create);
router.delete('/messages/:id',  MessageController.Index);

  
  
  
  app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
    })
  })
  
module.exports = router;
