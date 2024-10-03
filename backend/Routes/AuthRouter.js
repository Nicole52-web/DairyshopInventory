const express = require("express");
const AuthRouter = express.Router(); // create a router

const { authenticateUser } = require("../Middleware/userAuthenticationMiddleware");
const { logOut, getMe, signIn, signUp } = require("../Controller/userController");
const {
    checkRegisterInput,
    checkLoginInput,
} = require("../Validation/UserDataRules");

const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");


// Authentication routes
AuthRouter.post("/logout", logOut);
AuthRouter.get("/me", authenticateUser, getMe);

AuthRouter.post(
    "/signup",
    checkRegisterInput,
    inputValidationMiddleware,
    signUp
);
AuthRouter.post(
    "/signin",
    checkLoginInput,
    inputValidationMiddleware,
    signIn
);



module.exports=AuthRouter;