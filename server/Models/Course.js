const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
      },
  courseDescription: {
    type: String,
  },
  Instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    // required:true,
  },
  textContent:{
    type:String
  },
  ratingAndReviews:{
    type:mongoose.Schema.Types.ObjectId
  },
  price: {
    type: Number,
  },
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    type:String
    // ref:"CourseCategory",
  },
  studentsEnrolled:{
    // type:mongoose.Schema.Types.ObjectId,
    type:String,
    default:0,
    // required:true,
    ref:"User"
  },
  HoursofContent:{
    type:Number
  },
  paidorFree:{
    type:String,
  },
  thumbnail:{
    type:String
  }
});

module.exports = new mongoose.model("Courses", CourseSchema);
