const Course=require('../Models/Course');

const gettopcourses=async(req,res)=>{
   const topcourses=await Course.find({});
   res.json({
    data:topcourses
   })
}
// const postCourse=async(req,res)=>{
//    const {CourseData,textfields}=req.body;
//    const teacherEmail=req.params.classTeacher;
//    console.log(CourseData);
//    console.log(teacherEmail);
//    const createdCourse=await Course.create({
//       courseName:CourseData.courseName,
//       courseDescription:"A new course",
//       Instructor:teacherEmail,
//       CourseContent:textfields,
//       ratingAndReviews:0,
//       price:CourseData.price,
//       Category:CourseData.Category,
//       studentsEnrolled:0,
//       HoursofContent:CourseData.HoursofContent,
//       paidorFree:CourseData.paidorFree,
      
      

//    });
//    console.log(createdCourse);
//    res.json({
//       data:CourseData
//    })
// }

module.exports=gettopcourses;