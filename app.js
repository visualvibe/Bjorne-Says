const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const hiScoresController = require('./controllers/hiScoresController.js');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));


//start controllers
hiScoresController(app);





  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS")
    res.header("Access-Control-Allow-Credentials", true)
    next()
  })


app.listen('5002', () =>{
 console.log('Server started on port 5002');
});