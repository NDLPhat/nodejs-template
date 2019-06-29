const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",

    },
    body: {
        type: String,
        required: "Body is required",

    }
})

module.exports = mongoose.model("User", userSchema);