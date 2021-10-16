const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json())
//TO LISTEN THE PORT
app.listen(1300);

app.get('/api/signin', (req, res) => {

    console.log(req)
    res.send("hello from 1300")

})