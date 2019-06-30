const User = require("../model/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator/check");
require("dotenv").config();

exports.signup = async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(403).json({ error: "Email is taken" });

    const errors = validationResult(req);
    if (errors) return res.status(400).json({ error: errors.array()[0].msg });

    const user = await User(req.body);
    await user.save();
    res.json({ message: "success" });
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        // if error or no user
        if (err || !user) { return res.status(401).json({ error: err }); }

        // if user is found make sure the email and password match
        // create authenicate method in model and use use here
        if (!user.authenticate(password)) { return res.status(401).json({ error: "Email and password do not match" }); }
        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 86400 });
        // return response with user and token to frontend client
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, email, name } });
    });

    // if user, authenticate
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
    // if the token is valid, express jwt appends the verified user id
    // in an auth key to request object
    secret: process.env.JWT_SECRET
    // userProperty: "auth"
});
