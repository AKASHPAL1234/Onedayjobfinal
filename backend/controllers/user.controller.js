


import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import createTokenAndSavekey from "../jwt/Authtoken.js";
import { Otp } from "../models/otp.model.js";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();














export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }
    const { email, name, password, phone,  role } = req.body;
    if (
      !email ||
      !name ||
      !password ||
      !phone ||
     
      !role ||
      !photo
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
    await newUser.save();
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Welcome to OneDayJob ",
    //   html:Welcome_Email_Template.replace("{name}",name),
    //   });
   

    if (newUser) {
      let token = await createTokenAndSavekey(newUser._id, res);
      console.log("Singup: ", token);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          education: newUser.education,
          kycStatus: newUser.kycStatus,
          avatar: newUser.avatar,
          createdOn: newUser.createdOn,
        },
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};




export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    let token = await createTokenAndSavekey(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        kycStatus: user.kycStatus,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};



export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user:process.env.EMAIL_USER, pass:process.env.EMAIL_PASS},
});




export const sendotp = async (req, res) => {
  try {
   

    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });
    

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    await Otp.deleteMany({ email });
    console.log("👉 Generating OTP:", otpCode, "for", email);

    const otpDoc = await Otp.create({
  email,
  otp: otpCode,
  expiresAt: new Date(Date.now() + 5 * 60 * 1000),
});
console.log("OTP stored:", otpDoc);


    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your Email - OneDayJob",
      text: `Your OTP code is ${otpCode}. It will expire in 5 minutes.`,
      html: Verification_Email_Template.replace("{verificationCode}", otpCode),
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};









 export const verifyotp=async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });
    if (otpRecord.expiresAt < new Date()) return res.status(400).json({ message: "OTP expired" });

    res.json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};


// export const  getMyProfile = async (req, res) => {
//   const user = await req.user;
//   res.status(200).json({ user });
// };

export const getMyProfile = async (req, res) => {
  try {
    // req.user middleware se populate hota hai
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: req.user });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const resetPasswordWithoutToken = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user found with this email" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

};
