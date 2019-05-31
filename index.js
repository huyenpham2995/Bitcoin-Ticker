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
  console.log(req.body);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var option = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
    from: crypto,
    to: fiat,
    amount: amount
    }
  }
  request(option, function (error, response, body) {
    //change json object to javascript object
    var data = JSON.parse(body);
    var price = data.price;
    var today = data.time;

    //only 1 res.send is accepted =? use res.write to write all, then send to end
    res.write("<p>The current date is " + today +"</p>");
    res.write("<h1>"+amount +" of "+crypto +" is "+ price + fiat + "</h1>");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server on port 3000");
});
