import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hobbies: [{
        type: String,
    }]
});

const userModel = mongoose.model('User', userSchema);
export default userModel;