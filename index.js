//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
//make a request to external server
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
  //first parameter: url that we are making request to
  //call back function
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  request(baseURL + crypto +fiat, function (error, response, body) {
    //change json object to javascript object
    var data = JSON.parse(body);
    var price = data.last;
    var today = data.display_timestamp;

    //only 1 res.send is accepted =? use res.write to write all, then send to end
    res.write("<p>The current date is " + today +"</p>");
    res.write("<h1>The price of " + crypto + " is " + price + fiat + "</h1>");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server on port 3000");
});
