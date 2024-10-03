const mongoose = require ("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password : {
        type:String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
})

//Hashing password
UserSchema.pre('save', async function (next){
    if(this.isModified('password') || this.isNew ){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
})

//compare the entered password with the hashed password
UserSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

UserSchema.methods.getJwtToken = function (){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

module.exports= mongoose.model('User',UserSchema);