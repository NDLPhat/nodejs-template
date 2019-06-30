var { check } = require("express-validator/check");

// exports.userPostValidator = [
//     check('title', "title is empty").not().isEmpty(),
//     check("body", "body is empty").not().isEmpty(),
//     check("title", "title must be between 4 to 150 characters").isLength({ min: 4, max: 150 }),
//     check("body", "body must be between 4 to 2000 characters").isLength({ min: 4, max: 2000 }),
// ];

exports.userSignup = [
    check('name', "name is empty").not().isEmpty(),
    check("email", "email is empty").isEmail(),
    check("password")
        .not().isEmpty().withMessage("password is empty")
        .isAlpha().withMessage("password is must be alpha")
        .isLength({ min: 4 }).withMessage("password is should be at least 4 characters")
];

exports.emailExist = [
    check("email")
        .exists().withMessage("email is undefined")
        .isEmail().withMessage("wrong format")
        .not().isEmpty().withMessage("email is empty")
]
