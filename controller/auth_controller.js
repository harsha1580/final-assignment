const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });
    try {
        const saveUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: "signup successful",
            data: saveUser
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json({ success: false, message: "wrong credenial!" });

        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
        originalPassword != req.body.password && res.status(401).json({ success: false, message: "wrong credenial!" });

        const accessToekn = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { pass, ...other } = user._doc;
        //console.log(user)
        res.status(200).json({ ...other, accessToekn });
    } catch (err) {
        //console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }

}


module.exports = {
    register,
    login
}