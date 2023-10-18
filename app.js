//jshint esversion: 6


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "2a4b5759d7ffb4a16d5d3ce3d5715b81-us11",
  server: "us11",
});

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

// run();



const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const mail = req.body.enterEmail;
    const listId = "405efe0010";
    const newSubscriber = {
        firstName: fName,
        lastName: lName,
        email: mail
      };


      async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: newSubscriber.email,
          status: "subscribed",
          merge_fields: {
            FNAME: newSubscriber.firstName,
            LNAME: newSubscriber.lastName
          }
        });

        

    }
    run();


if(res.statusCode==200){
    res.sendFile(__dirname + "/success.html");
}

else{

    res.sendFile(__dirname + "/failure.html");
}



});






app.listen(process.env.PORT || 3000, function(){
    console.log("Server is working...");
});







 
