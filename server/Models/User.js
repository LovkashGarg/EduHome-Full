const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        maxLength:70,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type:String,
        default:"Student",
        enum:["Teacher","Student","Visitor"],
    },
    // image:{
    //     public_id:{
    //         type:String,
    //         required:true,
    //     },
    //     url:{
    //         type:String,
    //         required:true,
    //     }
    // }
    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }
});
module.exports=new mongoose.model('User',UserSchema);