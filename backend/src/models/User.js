import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    OTPVerificationToken: {
      OTP: String,
      expires: Date,
    },
    verificationToken: {
      token: String,
      expires: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("email")) {
    return next();
  }

  const token = crypto.randomBytes(32).toString("hex");
  this.verificationToken = {
    token,
    expires: Date.now() + 3600000, // 1 hour
  };

  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.verificationToken = {
    token,
    expires: Date.now() + 3600000, // 1 hour
  };
};

const User = mongoose.model("User", UserSchema);
export default User;
