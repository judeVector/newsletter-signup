const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/', (req, res) => {
    const { fName, lName, email,} = req.body;
    console.log(`${email} registered to your newsletter!`);

    const mcData = {
        members: [
            {
                email_address: email,
            status: `subscribed`,
            merge_fields: {
                FNAME: fName,
                LNAME: lName,
                        }
            }
        ]
    }

    const mcDataPost = JSON.stringify(mcData);

    const options = {
        url: 'https://us18.api.mailchimp.com/3.0/lists/97af64021b',
        method: 'POST',
        headers: {
            Authorization: 'auth de406502220ebbe51e566194c1121b6c-us18'
        },
        body: mcDataPost
    }

     request(options, (err, response, body) => {
        res.redirect("/success.html")
    })
})

app.post("/success", function(req, res){
    res.redirect("/")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
