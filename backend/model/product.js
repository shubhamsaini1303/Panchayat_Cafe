const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount_precent : {
        type:Number,
        default:0
    },
    discount_price:{
        type:Number
    },
    image:{
        type:String,

    },
    // shop_address:{
    //     type:String,
    //     required:true
    // },
    // ratings:{
    //     type:Number,
    //     default:1,
    //     min:1,
    //     max:5
    // },
    time:{
        type:String,
        required:true
    },
    // shop_name:{
    //     type:String,
    //     required:true
    // },
    category_id:{
        // kisi or document ki object id
        type :mongoose.Schema.ObjectId,
        ref:"Category"
    },
    color: 
        // color ek sath ek se jada value bhejta hai array jse to array me save hoga
       [ {
        type:mongoose.Schema.ObjectId,
        ref:"ColorModel"
    }
],
    status:{
    type:Boolean,
    default:true
    },
    stock:{
    type:Boolean,
    default:true
    }

});

const Product = mongoose.model("Product" , productSchema);

module.exports = Product; 