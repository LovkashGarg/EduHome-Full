const express=require('express');
const router=express.Router();

const {signup,login} =require('../Controllers/Auth')
const {auth,isStudent,isTeacher}=require('../Middleware/auth')

// Here we are using three middlewares inn which the first one if for authentication 
// then second is for protected route for student and third is for Admin
router.post("/signup",signup);
router.post("/login",login);
router.get("/Tests",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Protected route for Tests"
        })
});
router.get("/Student",auth,isStudent,(req,res)=>{
    const datasend=req.user;
    return res.json({
        success:true,
        userdata:datasend,
        message:"Welcome to the Protected section of Student section"
        })
});

// Here auth and isAdmin are two middle ware
// middleware is nothing but function
router.get("/Teacher",auth,isTeacher,(req,res)=>{
    const datasend=req.user;
   return res.json({
        success:true,
        userdata:datasend,
        message:"Welcome to the Protected section of Teacher section"
        })
    }
    ); 
module.exports=router;