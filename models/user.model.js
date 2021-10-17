const mongoose = require('mongoose');
const Register = new mongoose.Schema({
    mobile: {
        type: String,
       /* required: true,*/
        unique: true
    },
    email: {
        type: String,
       /* required: true*/
    },
    password: {
        type: String,
      /*  required: true,*/

    },
     name: {
         type: String,
       /*  reuired:true*/
    },
    contacts: {
        type: Array,
        default: [{
            Name: "Janvi Thakkar",
            Email: "janvithakkar.583@gmail.com",
            Mobile:"8320996025"
        }]
    }

                                            
},
    { collection: 'UserData' }
)

const model = mongoose.model("UserData", Register);
module.exports = model;