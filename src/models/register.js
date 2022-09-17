const mongoose = require("mongoose");

const employSchema = new mongoose.Schema({

    firstName : {
        type : String ,
        required : true},

    lastName :{
        type : String , 
    },

    password :{
        type:String ,
        required:true 
    },

    cpassword :{
        type:String ,
        required:true 
    },

    email :{
        type:String ,
        required :'please enter your email',
        unique : true,
        trim:true,
        lowercase:true
    },
    phone :{
        type:Number 
    },

    gender :{
        type:String,
        required : true
    },
    field:{
        type:String,
        required :true
    }
})

const Register  = new mongoose.model("Register" , employSchema);


module.exports = Register ;