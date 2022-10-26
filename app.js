const express = require("express");
const bodyParser = require("body-parser")

const app = express();
const port = 3000;
const https = require("https");


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
   

});

app.post("/", function(req, res){
    console.log(req.body.cityName);

    const cityQuery = req.body.cityName;
    const apiKey = "8eadc68c33db9e3c80c64bcf4ee92d1e";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The weather is currently " + description + ".</h1>");
            res.write("<p>The temperature in " + cityQuery + " is currently " + temperature + " degrees celcius</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});



app.listen(port, function(){
    console.log(`Server listening on port ${port}`);
});