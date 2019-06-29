var { check } = require("express-validator/check");

exports.userPostValidator = [
    check('title', "title is empty").not().isEmpty(),
    check("body", "body is empty").not().isEmpty(),
    check("title", "title must be between 4 to 150 characters").isLength({ min: 4, max: 150 }),
    check("body", "body must be between 4 to 2000 characters").isLength({ min: 4, max: 2000 }),
];