const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const https = require("https");
require("dotenv").config();

const apiKey = process.env.API_KEY;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/6d558f5ffd";
    var x = "shubham:"+apiKey
    const option = {
        method: "POST",
        auth: x,
    }
    const request= https.request(url,option,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on("data",function(data){
        //     console.log(JSON.parse(data));
        // })
    });
    request.write(jsonData);
    request.end();
});

app.post("/backToMain",function(req,res){
    res.redirect("/");
})

app.listen(3000|| process.env.PORT,function(req,res){
console.log("server is running on port 3000");
});


//audience id
//6d558f5ffd