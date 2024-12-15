const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "please enter your name"],
    },
    email:{
        type:String,
        unique: true,
        required:[true, "please enter your email"],
        match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Please enter a valid Gmail address"], // Regex for @gmail.com
    },
    password:{
        type:String,
        required:[true, "please enter your password"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Defines the accepted values for role
        default: 'user' // Sets the default role to 'user'
    },    
    status:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
