const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Define User Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    }
});

//Hasing password
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;