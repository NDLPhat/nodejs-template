var User = require("../model/user");
var { validationResult } = require("express-validator");
// exports.userById = (req, res, next, id) => {
//     console.log("userById", id);
//     User.findById(id, (err, user) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 error: "User not found"
//             })
//         }
//         req.profile = user;
//         next();
//     })
// }

// exports.hasAuthorization = (req, res, next) => {
//     const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
//     if (authorized) {
//         return res.status(403).json({
//             error: "User is not authorized to perform this action"
//         })
//     }
// }

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) return res.status(400).json({ error: err });
        res.status(200).json({ users });
    }).select('name email updated created')
}

exports.getUser = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err || !user) return res.status(400).json({ error: err, message: "User not found" });
        user.salt = undefined;
        user.hashed_password = undefined;
        return res.status(200).json(user);
    })
}

exports.updateUser = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err || !user) return res.status(400).json({ message: "User not found" });

        var errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(401).json({ eror: errors.array()[0].msg });

        user.email = req.body.email;
        user.updated = Date.now();
        user.save(err => {
            if (err) return res.status(401).json({ error: err })
            res.status(200).json({ message: "OK" });
        });

    })
}

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.findById(id, (err, user) => {
        console.log(err, user, "delete")
        if (err || !user) return res.status(400).json({ message: "User not found" });

        user.remove(err => {
            if (err) return res.status(400).json({ error: err });
            res.status(200).json({ message: "OK" })
        })
    })
}