var express = require("express");
var { allUsers, getUser, updateUser, deleteUser } = require("../controller/user");
var { requireSignin } = require("../controller/auth");
var { emailExist } = require("../validator/user");
var routes = express.Router();

routes.get("/all", requireSignin, allUsers);
routes.get("/user/:id", requireSignin, getUser);
routes.put("/user/:id", requireSignin, emailExist, updateUser);
routes.delete("/user/:id", requireSignin, deleteUser);


// routes.param("userId", userById);
module.exports = routes;