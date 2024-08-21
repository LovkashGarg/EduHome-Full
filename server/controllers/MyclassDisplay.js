const Classes =require('../Models/Classes');
const MyclassDisplay=async(req,res)=>{
    const myemail="kunal@12345";
    const myclasses=await Classes.find({classTeacher:myemail})
    res.send(myclasses);
}
module.exports=MyclassDisplay;