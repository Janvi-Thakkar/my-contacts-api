const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./user.model.js')
const bcrypt = require('bcryptjs');
const port = process.env.PORT;
const connection_url = "mongodb+srv://janvi_1103:ldce%402023@cluster0.n6oya.mongodb.net/test";

// TO AVOID CORS POLICY ERRORS
app.use(cors());
app.use(express.json())

//TO LISTEN THE PORT
app.listen(port);
mongoose.connect(connection_url, {
    dbName: "my-contacts"
});


app.post('/api/signin',async (req, res) => {
      let signInUser=""
    if (req.body.password != null && req.body.password != "" && req.body.mobile.length == 10) {
        signInUser = await user.findOne({
            mobile: req.body.mobile,
        })

        if (signInUser) {
            let isPassvalid = await bcrypt.compare(req.body.password, signInUser.password);
        }
            if (signInUser && isPassvalid) {
                res.status(200).send({ status: "ok", code: 200, result: signInUser });

            }
            else {
                res.status(401).send({ error: 'Mobile number or password is incorrect', code: 401 });
            }
       
        
    }
   
    else {
     
        if (req.body.password == null && req.body.password == "") {
            res.status(402).send({ error: 'Password can not be null', code: 402 });
        }
        else if (req.body.mobile.length != 10) {
            res.status(403).send({ error: 'Mobile Number should be of 10 digits', code: 403 });
        }
        else {
            res.status(401).send({ error: 'Mobile number or password is incorrect', code: 401 });
        }
        
    }

  
   
})

app.post('/api/register', async (req, res) => {
  
    try {
        if (req.body.password != null && req.body.password != "" && req.body.mobile.length == 10 && req.body.name != null && req.body.name != "" && req.body.email != null && req.body.email != "") {
            let pass = await bcrypt.hash(req.body.password, 10);
            const RegisterUser = await user.create({
                'mobile': req.body.mobile,
                'name': req.body.name,
                'email': req.body.email,
                'password': pass,
                "contacts": [{
                    "mobile": "1112223334",
                    "email": "xyz@gmail.com",
                    "name":"Janvi Thakkar"
                }
                ]
            })
            res.status(200).send({ status: "ok", code: 200, result: RegisterUser});
        }
        else {
            res.status(401).send({ status: "error", code: 401, error: "user already exist" });
        }
    }
    catch (error) {
       if (req.body.mobile.length != 10) {
            res.status(402).send({ status: error, code: 403, error: "Mobile Number should be of 10 digit" });
        }
        else if (req.body.password == null || req.body.password == "" || req.body.mobile.length != 10 || req.body.name == null || req.body.name == "" || req.body.email == null || req.body.email == "") {
            res.status(403).send({ status: error, code: 402, error: "All fields are madatory" });
        }
        else {
            res.status(401).send({ status: error, code: 401, error: "user already exist" });
        }
       
    }
   
    

})

app.patch('/api/addContact', async (req, res) => {
 
    user.updateOne({ mobile: req.headers.authorization }, { $push: { contacts: { name: req.body.name, mobile: req.body.mobile, email:req.body.email}} },).then(result => {
        res.status(200).json({ status: "ok", code: 200, result:result });
      
        }).catch(error => {
        
        res.status(401).json({ status: "error", code: 401, error: error });
    })

})

app.get('/api/user', async (req, res,next) => {
    user.find({ 'mobile': req.headers.authorization }).then(result=>{
        res.status(200).json({ status: "ok", code: 200, result: result });
       
    }).catch (error=> {
        res.status(401).json({ status: "error", code: 401, error: error });
    })
     
})


app.patch('/api/editUser', async (req, res, next) => {
    user.updateOne({ mobile: req.headers.authorization }, { name: req.body.name }).then(result => {
        res.status(200).json({ status: "ok", code: 200, result: result });
    }).catch(error => {
        res.status(401).json({ status: "error", code: 401, error: error });
    })

})

app.patch('/api/editContact', async (req, res, next) => {
    user.updateOne({ mobile: req.headers.authorization, contacts: { mobile: req.body.mobile } }, { $set: { contacts: { name: req.body.name, email:  req.body.email }}   }).then(result => {
        res.status(200).json({ status: "ok", code: 200, result: result });
    }).catch(error => {
        res.status(401).json({ status: "error", code: 401, error: error });
    })
})

app.patch('/api/delContact', async (req, res) => {

    user.update({ mobile: req.headers.authorization }, { $pull: { contacts: { name: req.body.name, mobile: req.body.mobile, email: req.body.email } } },).then(result => {
        res.status(200).json({ status: "ok", code: 200, result: result });

    }).catch(error => {

        res.status(401).json({ status: "error", code: 401, error: error });
    })

})
