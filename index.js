const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/router');
// Create express app
const app = express();

// Setup body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.json());
app.use(routes);


// Define routes
const router = express.Router();

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
