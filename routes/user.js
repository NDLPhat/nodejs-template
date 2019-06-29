const express = require("express");
const { getPosts, createPosts } = require("../controller/user");
const { userPostValidator } = require("../validator/user");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", userPostValidator, createPosts)


module.exports = router;