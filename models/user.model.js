const mongoose = require('mongoose');

var contact = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    
    
    
});
const Register = new mongoose.Schema({
    mobile: {
        type: String,
       required: true,
        unique: true
    },
    email: {
        type: String,
       required: true
    },
    password: {
        type: String,
       required: true

    },
     name: {
         type: String,
        reuired:true
    },
    contacts: [contact]
    
       
        
    },

                                            

    { collection: 'UserData' }
)

const model = mongoose.model("UserData", Register);
module.exports = model;