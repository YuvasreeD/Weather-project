const express=require("express");
const bodyparser=require("body-parser");

const https=require("https");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

})


app.post("/",function(req,res){
     var cityname=req.body.city
     const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=f5bdf669449e009cc9bb13527651b4c8&units=metric";
     https.get(url,function(response){
     console.log(response.statusCode);

     response.on("data",function(data){
         const weatherData=JSON.parse(data);
         const description= weatherData.weather[0].description;
         const temp=weatherData.main.temp;
        
         const icon=weatherData.weather[0].icon;
         const iconurl= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        
         res.write("<h1>The temperature in "+cityname+" is "+temp+" degree celcius</h1>");
         res.write("<h2>The weather is currently "+description+"</h2>");
         res.write("<img src=" +iconurl+">");


        res.send();

         

         

     
     })
 })

})

// const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=f5bdf669449e009cc9bb13527651b4c8&units=metric";
// https.get(url,function(response){
//     console.log(response.statusCode);

//     response.on("data",function(data){
//         const weatherData=JSON.parse(data);
//         const description= weatherData.weather[0].description;
//         const temp=weatherData.main.temp;
        
//         const icon=weatherData.weather[0].icon;
//         const iconurl= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        
//         res.write("<h1>The temperature in India is "+temp+" degree celcius</h1>");
//         res.write("<h2>The weather is currently "+description+"</h2>");
//         res.write("<img src=" +iconurl+">");

//         res.send();

     
//     })
// })





app.listen(3000,function(){
    console.log("Server is listening on port 3000");
});
