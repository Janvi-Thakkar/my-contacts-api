const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('../server/models/user.model.js')
/*const signInModel = require('../server/models/signIn.model')*/

// TO AVOID CORS POLICY ERRORS
app.use(cors());
app.use(express.json())

//TO LISTEN THE PORT
app.listen(1300);

mongoose.connect("mongodb://localhost:27017/my-contacts")

app.post('/api/signin',async (req, res) => {

    if (req.body.password != null && req.body.password != "" && req.body.mobile.length == 10) {
        const signInUser = await user.findOne({
            mobile: req.body.mobile,
            password: req.body.password
        })


        if (signInUser != null) {
            res.json({ status: "ok", code: 200 });
            console.log(signIn)
        }
    }
   
    else {
     
        if (req.body.password == null && req.body.password == "") {
            res.json({ status: "error", code: 402, error: "Password can not be null" });
        }
        else if (req.body.mobile.length != 10) {
            res.json({ status: "error", code: 403, error: "Mobile Number should be of 10 digits" });
        }
        else {
            res.json({ status: "error", code: 401, error: "Mobile number or password is incorrect" });
        }

    }

  
   
})

app.post('/api/register', async (req, res) => {
  
    try {
        if (req.body.password != null && req.body.password != "" && req.body.mobile.length == 10 && req.body.name != null && req.body.name != "" && req.body.email != null && req.body.email != "") {
            const RegisterUser = await user.create({
                'mobile': req.body.mobile,
                'name': req.body.name,
                'email': req.body.email,
                'password': req.body.password
            })
            res.json({ status: "ok", code: 200 });
        }
        else {
            res.json({ status: error, code: 401, error: "user already exist" });
        }
    }
    catch (error) {
        if (req.body.mobile.length != 10) {
            res.json({ status: error, code: 402, error: "Mobile Number should be of 10 digit" });
        }
        else if (req.body.password == null || req.body.password == "" || req.body.mobile.length != 10 || req.body.name == null || req.body.name == "" || req.body.email == null || req.body.email == "") {
           res.json({ status: error, code: 403, error: "All fields are madatory" });
        }
        else {
            res.json({ status: error, code: 401, error: "user already exist" });
        }
       
    }
   
    

})