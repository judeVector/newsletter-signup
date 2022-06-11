const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
import {url, auth_key} from './api_key/my_url';
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
        url: url,
        method: 'POST',
        headers: {
            Authorization: auth_key,
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
