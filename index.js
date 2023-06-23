const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/router');
const socket = require('./sockets/socket') 
// Create express app
const app = express();

// Setup body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app should use static files like css, js, html
app.use(express.static(__dirname));

//message database model
var Message = mongoose.model('Message',{
  name : String,
  message : String
})

app.use(express.json());
app.use(routes);
//app using socket module
app.use(socket)


// Define routes
const router = express.Router();
//app connecting to mogo db # although not created the database
var dbUrl = 'mongodb://username:password@ds257981.mlab.com:57981/simple-chat'

mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
  console.log('mongodb connected',err);
})

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
