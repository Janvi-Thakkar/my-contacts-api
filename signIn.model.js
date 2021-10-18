const mongoose = require('mongoose');
const signIn = mongoose.Schema({
    mobile: {
        type: number,
        required: true,
        length: 10,
        unique:true
    },
    password: {
        type: String,
        required: true,

    }
},
    {collection: ""}
)

const signInModel = mongoose.model("signInModel", signIn);


