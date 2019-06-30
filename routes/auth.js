const express = require("express");
const { signup, signin, signout, requireSignin } = require("../controller/auth");
const { userSignup } = require("../validator/user");

const router = express.Router();

// router.get("/", requireSignin, getPosts);
// router.post("/post", requireSignin, createPosts);
router.post("/signup", userSignup, signup);
router.post("/signin", signin);
router.post("/signout", signout);
// router.post("/userId", userById);


module.exports = router;