const express = require('express');
const mongoose = require('mongoose');
const { number } = require('prop-types');
const signUprouter = express.Router();
const user = mongoose.model("User");
const allowedMobileModel = mongoose.model("allowedMobile");
const Cryptr = require('cryptr');
const EncryptionKey = "Testing1230";
const cryptr = new Cryptr(EncryptionKey);

const ValidatesignUpData = async (data) => {
    let returnMsg = {
        status: false,
        message: "",
        field: ""
    }
    if (data.mobile == null || data.mobile == "") {
        returnMsg.message = "Mobile No. is required field";
        returnMsg.field = "mobile";
        return returnMsg;
    } else if (isNaN(data.mobile)) {
        returnMsg.message = "Mobile No. Must be number type";
        returnMsg.field = "mobile";
        return returnMsg;
    } else {
        let isAlredyRegistered = false;
        const registeredEnrollmentStatus = await user.find({ mobile: data.mobile }, { mobile: 1, _id: 0 }).exec().then(
            (registeredMbile) => {
                if (registeredEnrollment.length > 0) {
                    isAlredyRegistered = true;
                    returnMsg.message = "Mobile No. is Already registered. Try another";
                    returnMsg.field = "mobile";
                    return returnMsg;
                }
            }
        );
        if (isAlredyRegistered) {
            return registeredMobileStatus;
        }
        const AllowedMobileStatus = await allowedMobileModel.find().exec().then(
            (allowedMobile) => {
                for (let i = 0; i < allowedMobile.length; i++) {
                    let start = allowedMobile[i].start;
                    let end = allowedMobile[i].end;
                    if (data.Mobile >= start && data.Mobile <= end) {
                        return true;
                    }
                }
                return false;
            }
        );
        if (!AllowedMobileStatus) {
            returnMsg.message = "You Are not registered in LDCE enrollment list";
            returnMsg.field = "none";
            return returnMsg;
        }

    }
    if (data.username.trim() == "") {
        returnMsg.message = "Username is required field";
        returnMsg.field = "username";
        return returnMsg;
    } else {
        isAlredyRegistered = false;
        const registeredUsernameStatus = await user.find({ username: data.username }, { username: 1, _id: 0 }).exec().then(
            (registeredUsername) => {
                if (registeredUsername.length > 0) {
                    isAlredyRegistered = true;
                    returnMsg.message = "Username is Already registered. Try another";
                    returnMsg.field = "username";
                    return returnMsg;
                }
            }
        );
        if (isAlredyRegistered) {
            return registeredUsernameStatus;
        }
    }
    if (data.password.trim() == "" || data.confirmPassword.trim() == "") {
        returnMsg.message = "Password is required field";
        returnMsg.field = "password";
        return returnMsg;
    } else if (data.password.trim() !== data.confirmPassword.trim()) {
        returnMsg.message = "Password and Confirm Password must be Same";
        returnMsg.field = "confirmPassword";
        return returnMsg;
    }

    if (data.contact == null || data.contact == "") {
        returnMsg.message = "Contact is required field";
        returnMsg.field = "contact";
        return returnMsg;
    } else if (isNaN(data.contact)) {
        returnMsg.message = "contact Must be number type";
        returnMsg.field = "contact";
        return returnMsg;
    } else if (data.contact.length != 10) {
        returnMsg.message = "contact Must be 10 digit";
        returnMsg.field = "contact";
        return returnMsg;
    }

    if (data.email.trim() == "") {
        returnMsg.message = "Email is required field";
        returnMsg.field = "email";
        return returnMsg;
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
        returnMsg.message = "Please Enter valid Email Address";
        returnMsg.field = "email";
        return returnMsg;
    }


    return { status: true };
}



signUprouter.post("/signup", (req, res) => {
    let signUpData = req;

    ValidatesignUpData(signUpData).then((valdationResponse) => {
        if (valdationResponse.status) {
            let Encryptedpassword = cryptr.encrypt(signUpData.password);
            const userData = new user({
                enrollment: parseInt(signUpData.enrollment),
                username: signUpData.username,
                password: Encryptedpassword,
                contact_no: parseInt(signUpData.contact),
                email: signUpData.email,
                signUpDate: new Date().getDate()
            });
            userData.save().then(
                (SaveRespo) => {
                    res.send({ status: true, message: "you signed up succesfully" });
                }
            ).catch(
                (err) => {
                    res.send({ status: false, field: "none", message: "OOPS!! Something Went Wrong" });
                }
            );

        } else {
            res.send(valdationResponse);
        }
    });
});
signUprouter.get("/signup", (req, res) => {
    res.send({ errCode: 404, errMessage: "Not Found" });
});

module.exports = signUprouter;