const express=require('express');
const cors=require("cors");
const app=express();
const userRoutes=require('./Routes/UserRoutes');
const courseRoutes=require('./Routes/courseRoutes');
// const profileRoutes=require('./Routes/profileRoutes');
const classRoutes=require('./Routes/classRoutes');
const SearchRoutes=require('./Routes/SearchRoutes');
const bodyParser = require('body-parser');
const Python=require('./data_mock/python.json');
const OOPS=require('./data_mock/OOPS.json');
const Dsa=require('./data_mock/DSA.json');
const SYS=require('./data_mock/SYS.json');

const cookieParser=require('cookie-parser');
require("dotenv").config();
app.use(express.json());
 const fileUpload=require("express-fileupload");
 app.use(fileUpload(
    {useTempFiles:true,
    tempFileDir:'/tmp/'} 
    ));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


const PORT=process.env.PORT;


// mounting on the routes
app.use('/api/v1/auth',userRoutes);
// app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/classes',classRoutes);
app.use('/api/v1/Search',SearchRoutes);


app.get('/Generate/:questiontype',(req,res)=>{
const questiontype=req.params.questiontype;
console.log((questiontype));

  // Determine the correct response based on the questiontype
  switch (questiontype) {
    case 'Python-MockTest':
      return res.json(Python);
    case 'DSA-MockTest':
      return res.json(Dsa);
    case 'OOPS-MockTest':
      return res.json(OOPS);
    case 'SYS_DES-MockTest':
      return res.json(SYS);
    default:
      return res.status(404).json({ error: 'Question type not found' });
  }
})
// db se connect kar diya
require('./config/Database').dbConnect();

app.listen(PORT,()=>{
    console.log("Listening on Port 5000")
})