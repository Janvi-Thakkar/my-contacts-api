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

        const signInUser = await user.findOne({
            mobile: req.body.mobile,
            password:req.body.password
        })

    if (signInUser) {
        res.json({ status: "ok", code: 200 });
         console.log(signIn)
    }
    else{
        res.json({ status: "error", code: 401, error: "Mobile number or password is incorrect" });
    }
   
})

app.post('/api/register', async (req, res) => {
    let data = req.body
    try {
        const RegisterUser = await user.create({
            'mobile': req.body.mobile,
            'name': req.body.name,
            'email': req.body.email,
            'password':req.body.password
        })
        res.json({ status: "ok", code: 200 });
    }
    catch (error) {
        res.json({ status: error, code: 401,error:"user already exist" });
    }
   
    

})