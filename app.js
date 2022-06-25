//Requiring the necessary modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');


//Setting the port
app.listen(3000, function(res,req){
  console.log('Server is running on port 3000');
});