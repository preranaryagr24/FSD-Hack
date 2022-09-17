const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    Full_Name : String,
    Email : String,
    text : String 

})

const Contact = new mongoose.model("Contact" , contactSchema);
module.exports =  Contact ;