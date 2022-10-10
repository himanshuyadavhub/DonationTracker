const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    userName: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    isCreator: {
        type:Boolean,
        required:true,
    },
    userId: {
        type:String,
    },
    profession: {
        type:String,
    }
});

module.exports = mongoose.model("User", userSchema);
