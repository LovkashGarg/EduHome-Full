const Classes=require('../Models/Classes');
const uploadImage=require('../Utils/imageUploader');
const classCreation=async(req,res)=>{
    try{
const {classTeacher,classTitle,classTime,classType,classCategory}=req.body;
  console.log(req.body);
// console.log("Request Body:", req.body);
// Data validation
// if(classTeacher==="" || classTitle==="" || classType==="" ||classCategory===""){
//    return res.status(401).json({
// success:false,
// message:"Not a valid input"
//     })
// }
const thumbnail=req.files.thumbnail.tempFilePath;
console.log(thumbnail);
// exist classes already

const existclass=await Classes.findOne({classTeacher,classTime});
if(existclass){
    return res.json({
        success:false,
        message:"Class already exist at this time"
    })
}

const thumbnailImageurl = await uploadImage(
    thumbnail,
    process.env.FOLDER_NAME
  );

const createclass=await Classes.create({
    classTeacher,classTitle,classTime,classType,classCategory,
    thumbnail:thumbnailImageurl.secure_url
})
// console.log(createclass);
    return res.status(200).json({
      success: true,
      data: `Class created By ${classTeacher}`,
      message: `Class Created category ${classCategory}`,
    });
    }
    catch(err){
        console.log(err);
        console.error(err);
      return  res.status(500).json({
            success:false,
            message:"Some Error "
        })
    }
}
module.exports=classCreation;