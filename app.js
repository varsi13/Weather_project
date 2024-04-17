const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
   const query = req.body.cityName;
   const apiKey = "6ff70a978dce97ec574f9ef0d8a61475";

   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;
   
   https.get(url, function(response){
       console.log(response.statusCode);
   
       response.on("data", function(data){
           const weatherData = JSON.parse(data);
           console.log(weatherData);
           const weatherDescription = weatherData.weather[0].description
           const pressure = weatherData.main.pressure
           const icon = weatherData.weather[0].icon
           const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
           res.write("<h1>The weather is currently " + weatherDescription + ".</h1>");
           res.write("<h1>The pressure in " + query + " is " + pressure + " pascal.</h1>");
           res.write("<img src = " + imageUrl + ">");
           res.send();
       });
    });
});


app.listen(3000, function(req, res){
    console.log("Server is running in port 3000...");
})