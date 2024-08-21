const Classes=require('../Models/Classes');

const SearchClasses=async(req,res)=>{

    const {id}=req.params;
    const toSearch=req.body;

    const filteredData=await Classes.find({
        $or: [
            { classTeacher: { $regex: `${id}`, $options: 'i' } }, // Matches beginning of field1
            { classTitle: { $regex: `${id}`, $options: 'i' } } ,   // Matches anywhere in field2
            { classCategory: { $regex: `^${id}`, $options: 'i' } }  // Matches beginning in field2
          ]
    });
    console.log(filteredData);
    res.json({
        data:filteredData
    })
}
module.exports=SearchClasses;