var express = require("express");//import express
var app = express();//create an app
//require the body parser package
var request = require("request");

//tells the app to uss the css file to something you can look at
app.use(express.static("public"));
//set the view engine so we can use ejs
app.set('view engine', 'ejs');

//looks for url matching the string and does the function
// looks for a /
app.get("/", function(req,res){
    res.render("home.ejs")
});

app.get("/results", function(req,res){
    var query = req.query.ISBN;
    var url = `https://openlibrary.org/api/books?bibkeys=ISBN:${query}&format=json&jscmd=data`;
    request(url,function(error,response,dataStream){
        if(!error && response.statusCode == 200){
            var json = JSON.parse(dataStream);
            var data = json[`ISBN:${query}`]
            res.render('results',{data:data})
        }
    })
})

// regex star takes everything this should be last so that other options are hit first
app.get("*", function(req, res){
    res.render("error.ejs");
});

//start the app listening on a port and do a function
app.listen(process.env.PORT, function()
{
    console.log("server active");
});