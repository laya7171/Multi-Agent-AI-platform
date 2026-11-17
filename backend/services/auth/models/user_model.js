import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    firebaseUId: {
        type: String, 
        unique: true
    },
    email: String,
    avatar: String

},{timestamps: true})

const User = mongoose.model('User', userSchema)
export default User