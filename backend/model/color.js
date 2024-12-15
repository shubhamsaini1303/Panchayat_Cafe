const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
},
{
    timestamps: true
}
);

const ColorModel = mongoose.model("ColorModel", colorSchema);

module.exports = ColorModel;