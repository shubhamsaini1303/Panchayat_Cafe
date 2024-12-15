const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    adminType: {
        type: Boolean,  // 0: Admin, 1: Super Admin
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,  // true: active, false: inactive
    },
}, { timestamps: true });

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;