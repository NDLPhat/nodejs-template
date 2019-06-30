const mongoose = require("mongoose");
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    hashed_password: {
        type: String,
        require: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: Date
})

userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        console.log("salt: ", this.salt);
        console.log("password: ", password);

        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    })

userSchema.methods = {
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            const hash = crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
            console.log("hash: ", hash);
            return hash;
        } catch (err) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema);