//Requiring the necessary modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//Sending the html file to the browser
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

//setting up the root of the server
app.post('/', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https:us12.api.mailchimp.com/3.0/lists/58e69caf03";
    
    const options = {
        method: "POST",
        auth: "Swapnil:" + "50fd7740620d627419a0489e9325aad3-us12"
    };

    const request = https.request(url, options, function(response){
        console.log(response.statusCode);
    
        if(response.statusCode === 200){
            console.log("i am in the if block");
            
            res.sendFile(__dirname + "/success.html");
        } else{
            console.log("i am in the else block");
            res.sendFile(__dirname + "/failure.html");
        }
        console.log(res.statusCode);
        response.on("data", function(data){  
        });
    });
    request.write(jsonData);
    request.end();
});

//redirect to the home page upon failure
app.post('/failure', function(req, res) {
    res.redirect("/");
});

//Setting the port
app.listen(process.env.PORT || 3000, function(res){
    console.log('Server is running on port 3000');
});

//api key (mail chimp): 50fd7740620d627419a0489e9325aad3-us12
//list id (mail chimp): 58e69caf03