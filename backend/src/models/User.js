import mongoose from mongoose


const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    OTPVerificationToken: {
        OTP: String,
        expires: Date
    },
    verificationToken: {
        token: String,
        expires: Date
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema);
export default User