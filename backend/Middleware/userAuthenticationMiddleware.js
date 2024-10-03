const jwt = require('jsonwebtoken')
const ErrorResponse = require('../Utils/errorResponse');
const UserModel = require('../Model/UserModel');

exports.authenticateUser =async (req, res, next) => {
    const { token } = req.cookies;
    //validate if token exists
    if(!token){
        return next(new ErrorResponse('You have to login!', 401));
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('You have to login!', 401));
    }
}
