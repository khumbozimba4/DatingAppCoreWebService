const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AccountController = require('../controllers/AccountController');
const authMiddleware = require('../middleware/auth_middleware');
const ProfileController = require('../controllers/ProfileController');

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

module.exports = router;
