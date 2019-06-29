var User = require("../model/user");
var { validationResult } = require("express-validator/check");

exports.getPosts = (req, res) => {
    var posts = User.find()
        .select("title body")
        .then((posts) => {
            res.status(200).json({ posts })
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })

}

exports.createPosts = (req, res) => {
    // console.log(req.body);
    var user = new User(req.body);
    console.log("CREATE POST: ", user);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array()[0].msg });
    }
    else {
        user.save();
        res.status(200).json({ message: "OK" });
    }
}