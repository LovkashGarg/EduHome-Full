const Course = require("../Models/Course");
const User = require("../Models/User");
const Tag = require("../Models/tags");
const  uploadImage = require("../Utils/imageUploader");

// createCourse handler function

exports.createCourse = async (req, res) => {
  try {
    // We want to do instructor validation
   
    const { courseName,category, price,HoursofContent, paidOrFree ,textContent} =req.body;
    // if(!price){
    //   paidOrFree:"Free";
    // }
    // get thumbnail
    // const thumbnail = req.files.image;
    // console.log(req.files.image);
    // console.log(req.file);
  // console.log(thumbnail);
    // Validation
    console.log(" Here data came " ,req.body);
    // if (
    //   // !thumbnail|| 
    //   // !paidOrFree ||
    //   !courseName ||
    //   !price ||
    //   !category ||
    //   !HoursofContent||
    //   !textContent
    // ) {
    //   console.log("data not complete");
    //   return res.status(400).json({
    //     success: false,
    //     message: "All Fields are required",
    //   });
    // }

    // check for instructor
    // const userId = req.user.id;
    // const instructorDetails = await User.findOne({ _id:userId });

    // console.log("Instructor Details " + instructorDetails);

    // if (!instructorDetails) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Instructor Details not Found",
    //   });
    // }

    // check given tag is valid or not we can do just by dropdown menu

    // const tagDetails = await Tag.findByID(tag);
    // if (!tagDetails) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Tag Details not Found",
    //   });
    // }

    // Now uploading the image to cloudinary

    // const thumbnailImageurl = await uploadImage(
    //   thumbnail.tempFilePath,
    //   process.env.FOLDER_NAME
    // );

    // create a Entry for new Course
    const newCourse = await Course.create({
      courseName,
      category,
      // Instructor: instructorDetails._id,
      // whatYouWillLearn: whatYouWillLearn,
      textContent:textContent,
      HoursofContent,
      paidOrFree,
      price,
      // thumbnail: thumbnailImageurl.secure_url,
    });
    console.log(newCourse);

    // add the new Courser to the user Schema of Instructor
    // Here is the use of Ref function
  //  const newUser= await User.findByIdAndUpdate(
  //     { _id:instructorDetails._id },
  //     {
  //       $push: {
  //         courses: newCourse._id,
  //       },
  //     },
  //     { new: true } // to get a updated response
  //   );

    // udate the Tag ka scheme
    // HW

    return res.status(200).json({
      success: true,
      message:"Course Created Succesfully",
      data:"Helo very good"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
        success:false,
        message:"Failed to create a New course",
        error:err.message,
    })
  }
};

exports.showAllCourses=async(req,res)=>{
    try{
const allCourses=await Course.find({},{
    courseName:true,
    courseDescription:true,
    price:true,
    Instructor:true,
    studentsEnrolled:true,
    ratingAndReviews:true,
    thumbnail:true,
})
.populate("Instructor") // matlab Instructor field me Instructor ki detail aajayegi
.exec();

// means that the following fields must be present
res.json({
  allCourses
})
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch Course data",
            error:err.message
        })
    }
}
exports.showMyCourses=async(req,res)=>{
  const userId = req.params.userId;
  const myemail=req.body.email;
  console.log(myemail);
  const objectidteacher = await User.findOne({ email: myemail });
  console.log(objectidteacher);
  const mycourses=await Course.findOne({Instructor:objectidteacher._id});
  // console.log(mycourses);
  res.json({mycourses});
}
exports.showCourseContent=async(req,res)=>{
  const {id}=req.body;
  console.log(id);
  const courseDetails=await Course.findOne({_id:id});
  const courseName=courseDetails.courseName;
  const data=courseDetails.textContent;
  const category=courseDetails.Category;
  if(data){
    return res.json({courseName:courseName,data,category});
  }
  else{
    return res.json({data:"No data available for this Course"});
  }
}
