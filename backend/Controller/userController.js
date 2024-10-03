const jwt = require('jsonwebtoken')
const User = require('../Model/UserModel')
const createError = require("http-errors");
const ErrorResponse = require('../Utils/errorResponse');


const signUp = async(req,res) => {
    const {name, email, password} = req.body;

    try {
        const user = new User({name, email, password});
        await user.save();
        res.status(201).json({message: 'User Created successfully'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
             return next(new ErrorResponse("Invalid email or password",400));
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials",400));
        }

        sendTokenResponse(user, 200, res);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const sendTokenResponse = async (user,codeStatus, res)=>{
    const token = await user.getJwtToken();
    res.status(codeStatus)
    .cookie('token', token, {maxAge: 60*60*1000, httpOnly: true})
    .json({
        success: true,  
        role: user.role
    })
 }


const getMe = async (req,res,next) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
        success: true,
        user
    })
}

const logOut = async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
};




module.exports = {signIn, signUp, logOut, getMe }