const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type:String,
            maxLength: 20
        },
        slug: {
            type: String,
            maxLength: 50
        },
        image: {
            type:String,
            maxLength:200,
            default:null
        },
        status: {
            type:Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model("Category" ,  CategorySchema);

module.exports = Category;