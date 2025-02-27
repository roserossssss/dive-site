import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 50,
        },
        birthday: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },

}, { timestamps: true }); 



const CertificateSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    image: { // Stores image as a URL or path reference
        type: String, // You can use Cloudinary, Firebase, or store locally
        required: false, 
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },

},{ timestamps: true }); // Adds createdAt and updatedAt fields



const diveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    date: {
        type: Date,
        required: true,
    },
    location: { 
        type: String,
        required: true,
        maxlength: 100,
    },
    depth: { // Dive depth in meters
        type: Number,
        required: true,
        min: 1, 
    },
    time: { // Dive time in minutes
        type: Number,
        required: true,
        min: 1, 
    },
    image: { // Stores image as a URL or path reference
        type: String, // You can use Cloudinary, Firebase, or store locally
        required: false, 
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    notes: {
        type: String,
        maxlength: 500, // Optional field for additional comments
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const DiveData = mongoose.models.DiveData || mongoose.model("DiveData", diveSchema)