import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    firebaseUId: {
        type: String, 
        unique: true
    } 

},{timestamps: true})