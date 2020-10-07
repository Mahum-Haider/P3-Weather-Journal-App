// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const http = require('http');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server
const server = app.listen(port, listening);
 function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
  };


// Add a GET route that returns the projectData
  app.get('/all', callBack)
  function callBack (req, res) {
    res.send(projectData);
	// res.send(JSON.stringify(projectData));
};


// Add a POST route that adds incoming data to projectData
	app.post('/add', function (req, res) {
    console.log(req.body)
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
  	 Object.assign(projectData, newEntry);
		  res.send(projectData)
		  console.log(projectData);
});


// GET Route I: 
  app.get('/requestZipCode', getData)
    function getData(req, res) {
		res.send(projectData)
};

