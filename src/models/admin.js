import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    profilePic: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    designation: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
