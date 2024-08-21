import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Course_showing_cpm = () => {
  const {courseName,id}=useParams();

  console.log(courseName,id);
    const [textcontentscourse,settextcontentscourse]=useState();
    const [titlecourseName,settitlecourseName]=useState();
  const [category,setcategory]=useState();
    const showcourseData=async(req,res)=>{
    
      const courseData = await axios.post("http://localhost:5000/api/v1/course/showCourseContent", { id });
const coursjson = courseData.data;
const titlecourse=coursjson.courseName;
// console.log(coursjson.data);
settitlecourseName(titlecourse);
setcategory(coursjson.category);
settextcontentscourse(coursjson.data)
    }
    useEffect(()=>{
      showcourseData();
  },[])
  return (
    <> 
    <div className='flex justify-center mt-[20px]'>
    <div className='text-center bg-red-500 text-white text-[35px] w-[50%] flex  flex-col  font-mono '>{titlecourseName} <div className='bg-green-500 text-[30px]'>{category}</div></div>
    </div>
     <p className='m-[20px] text-[23px] bg-black text-white p-[20px] '>
{textcontentscourse}
    </p>
    </>
  )
}

export default Course_showing_cpm