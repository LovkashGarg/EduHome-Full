const jwt = require("jsonwebtoken");
require("dotenv").config();

// here next is send as argument since we need to call the next middle ware also
exports.auth = (req, res, next) => {
  try {
    // extract JWT Token
    // we can extract it from header ,body or cookies
    // not neccessary it would be present in all.
    // other ways of fetch token
    // console.log("me called");
    const token = req.query.token;
    // console.log( " got the token" +token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }
    
    // verify the token
    try {
      // verify takes two argument that is token and secret key
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      // why this
      req.user = decode; // Here we send the req user to value
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token not valid",
      });
    }
    next(); // call for next middle ware
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    // go to line 27 for how it came
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected route for student",
      });
    }
    // we have written already the success response in the route section
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: " User Role is not matching",
    });
  }
};

exports.isTeacher = (req, res, next) => {
  try {
    if (req.user.role !== "Teacher") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected route for Teacher",
      });
    }
    // we have written already the success response in the route section
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: " User Role is not matching",
    });
  }
};
