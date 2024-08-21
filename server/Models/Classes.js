const mongoose=require('mongoose');

const classSchema= new mongoose.Schema({
    classTeacher:{
        type:String,
    },
classTitle:{
    type:String,
    default:"Untitled"
},
classTime:{
    type:String,
    default: Date.now
},
classType:{
    type:String,
    default:"Free"
},
classCategory:{
    type:String,
    default:"Physics"
},
thumbnail:{
    type:String
  }
})

module.exports=new mongoose.model('Classes',classSchema);