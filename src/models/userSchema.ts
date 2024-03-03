import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide username"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please provide email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: String,
        verifyToken: String,
        verifyTokenExpiry: String,
    },
    {
        timestamps: true,
    }
);

const users = mongoose.models.Users || mongoose.model("Users", UsersSchema);
export default users;