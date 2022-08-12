const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    total : {
        type : Number,
        default: 1
    },
    status :{
        type : String,
        enum : ['processing', 'deleted', 'done'],
        default: 'processing'
    }
},
{
    timestamps : true,
    versionKey : false
}
);

module.exports = mongoose.model("Cart" , cartSchema);