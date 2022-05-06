// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// require cors
const Cors = require('cors');

// require bodyparser
const bodyParser = require('body-parser');
const { prototype } = require('events');


// Initialize the main project folder
app.use(express.static('website'));


/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
// here i will use internal express bodyparser because the external bodyparser has been deprecated or not supported.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(Cors());

// Setup Server
const port = 4000;
app.listen(port,()=>{
    console.log(`the server is running at port : ${port}`);
})

// function to get data of weather
app.get('/getweather', (req, res) => {
   res.send(projectData); 
})

// function to post the data of weather
app.post('/postweather', (req, res) => {

   /*
   another method
   projectData.date = req.body.date
   projectData.fellings = req.body.feelings
   projectData.temp = req.body.temp

   */ 
   projectData = {...req.body}
   res.end();
   /*
   ## another way to get and post data

   we can delete the app.get function 
   and use this app.post function =>
   
   app.post('/postweather', (req, res) => {
   projectData = {...req.body}
   res.send(projectData);
   */ 
})