const Classes=require('../Models/Classes');

const ClassDisplay=async(req,res)=>{
   const currentTime=Date.now();

   try {
    const allliveclasses = await Classes.find({})
      .sort({ classTime: 1 }) // Sort by classTime in ascending order
      .limit(4); // Limit the result to 4 documents
      // console.log(allliveclasses);
    res.json({
        // success:true,
   data: allliveclasses
        // message:"All live classes recieved"
    })
    console.log("Sent");
  } catch (error) {
    console.error("Error fetching classes:", error);
  }

}

module.exports=ClassDisplay;