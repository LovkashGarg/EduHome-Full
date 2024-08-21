import React, { useEffect } from 'react'
import { useState } from 'react';
import student from "./Student.jpg";


const SearchResults = () => {
    const [toSearch,setTosearch]=useState();
   const [results,setResults]=useState([]);
    const fetchData=async(e)=>{
        e.preventDefault();
    console.log(toSearch);
   const url=`http://localhost:5000/api/v1/Search/SearchResults/${toSearch}`;
    let res=await fetch(url,{
      method:"POST",
      headers: { "content-type": "application/json"},
      // body:JSON.stringify(toSearch)
      });
      let resjson=await res.json();
      setResults(resjson.data);
    //   console.log("Results are: " +results);
  }
//   useEffect(()=>{
//     fetchData();
//         },[]);
  return (
    <div className=' bg-black h-[100vh] p-[20px] '>
    <form onSubmit={fetchData}><div  className='bg-black flex w-[100%] justify-center items-center h-[60px] mb-[20px] mx-[20px]  gap-[20px]'>
  <input type="text" className=' border-[3px] border-green-400  w-[500px] h-[50px] px-[40px]' onChange={(e)=>{setTosearch(e.target.value)}} />
  <button className='bg-red-600 text-white w-[100px] h-[50px] rounded-[40px]' type='submit'  >Search</button> 
  </div></form>
    <div className='text-[30px] text-white bg-green-400 text-center mx-[30%] rounded-[40px] '>Top SearchResults</div>
    <div className=' flex w-[100%] justify-center items-center '>
    {results.map((item)=>(
         <div className=" bg-black w-[850px] h-[200px] sm:w-[800px] sm:h-[270px] mx-[50px] border-[3px] rounded-[30px] border-green-500 flex flex-col my-[10px] items-center justify-center ">
         <div className="bg-red-600 text-white w-[150px] rounded-[20px] text-center">{item.classTeacher}</div>
         <div className="thumbnailsection flex justify-center items-center">
         </div>
         <img
              src={student}
              alt=""
              className="rounded-[10px] w-[150px] h-[150px] sm:w-[210px] sm:h-[150px] "
            />
        <div className='flex items-center gap-20 '><div className="title">{item.classTitle}</div> <div className='category self-end'>{item.classCategory}</div></div> 
         <button  className='bg-green-600 text-white w-[100px] h-[30px] rounded-[40px]' >Watch Now</button>
       </div>
       
    ))}
    </div>
    </div>

  )
}

export default SearchResults