const mongoose =require('mongoose')


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        requred:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    enteredOTP:{
        type:String,
        required:true
    },
    hashedPassword:{
        type:String,
        required:true
    }


});

const UserModel=mongoose.model('User',userSchema);

module.exports=UserModel;