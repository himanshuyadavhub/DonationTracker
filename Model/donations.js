const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    from:{
        type:String,
        required:true,
    },
    toCreator:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
    },
    message:{
        type:String,
    }
});

module.exports = mongoose.model("DonationData", donationSchema);
