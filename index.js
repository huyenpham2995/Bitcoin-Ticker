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
  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function (error, response, body) {
    //change json object to javascript object
    var data = JSON.parse(body);
    var price = data.last;
    console.log(price);
    res.send("<h1> The price of bitcoin is " + price + " USD </h1>");
  });
});
app.listen(3000, function() {
  console.log("Server on port 3000");
});
