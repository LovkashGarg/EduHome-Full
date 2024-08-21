const bcrypt = require("bcrypt");
const User = require("../Models/User");
const OTP = require("../Models/OTP");
const jwt = require("jsonwebtoken");
const cookie =require('cookie-parser');
const cloudinary=require('../Utils/imageUploader');
require("dotenv").config();
// send OTP
exports.sendOTP = async (req, res) => {
  try {
    // extract email from req.body
    const { email } = req.body;
    // check user if it already exists or not
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(401).json({
        success: false,
        message: "User already Exist",
      });
    }
    var otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // check unique otp or not
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload={email,otp};
    /// create an entry for OTP
const otpBody=await OTP.create(otpPayload);
console.log(otpBody);

// return response successful
res.status(200).json({
    success:true,
    message:"Succesfully generated OTP"
})
  } catch (err) {
    console.error(err);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // const image=req.files;
    // const result=await cloudinary.uploader.upload(image,{
    //   folder:"Usersimage",
    //   width:300,
    // });
    // // done validation
    // co
    if (name === "" || email === "" || password == "") {
      return res.json({
        success: false,
        message: "Not a valid Input",
      });
    }

    // finding that the user already exist or not
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this Mail",
      });
    }
    // secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Some Error in Hashing",
      });
    }
    // create an entry for User

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      // image:{
      //   public_id:result.public_id,
      //   url:result.secure_url,
      // }
    });
    console.log(createdUser);
    return res.status(200).json({
      success: true,
      data: `User with email ${email} ${createdUser}`,
      message: "User Created",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: `User not Registered`,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    // validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Not a valid Input ",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        data: "User Not exist",
        message: "User not Registered Please Signup First",
      });
    } else {
      // payload attaching
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };
      // verify password
      if (await bcrypt.compare(password, user.password)) {
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "3h",
        });
        user = user.toObject();
        user.token = token;
        user.password = undefined;
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
          success: true,
          token:token,
          user:user,
          message: "User Logged in Succesfully",
        });

        console.log(req.cookies.token);
        console.log("login Successful");
        // console.log(res.cookie);
      } else {
        // password not matched
        return res.status(403).json({
          success: false,
          message: "Password not Matched",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: `User not Registered`,
      message: "Internal server error",
    });
  }
};
