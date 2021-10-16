const mongoose = require('mongoose');
const signIn = mongoose.Schema({
    mobile: {
        type: number,
        required: true,
        length:10
    },
    password: {
        type: String,
        required: true,

    }
},
    { collection: 'user-data' }
)

const signInModel = mongoose.model("SignIn", signIn);
module.export = signInModel;

