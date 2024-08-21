import React, { useEffect, useState } from "react";
import student from "./Student.jpg";
import { Link } from "react-router-dom";
const LiveClasses = () => {
  
  const [data2,setData]=useState([]);
  const [data1,setData1]=useState([]);

  useEffect(()=>{
handleallclassesdata();
  },[])

  const handleallclassesdata=async()=>{
    try{
      const allliveclass=await fetch("http://localhost:5000/api/v1/classes/allliveclasses");
       
      const jsondata=await allliveclass.json();
      setData(jsondata.data);
      console.log("data from backend\n\n" + jsondata.data + "\n\n\n");
      console.log(jsondata.data);
      console.log("Hello " + data2);
    }
catch(err){
  console.error(err);
  console.log(err);
}
  }
  // console.log(allliveclasses);
  const Liveclasscard = (props) => {
    // const [teachers, setteachers] = useState("Pankaj Sir");
    const [livestudents, setlivestudents] = useState(1);
   
    // console.log("Hello "+ allliveclasses);
    return (
      <>
        <div className=" text-white w-[280px] h-[220px] sm:w-[300px] sm:h-[320px] mx-[30px] border-[3px] rounded-[30px] border-green-500 flex flex-col items-center justify-center ">
         
         <div className='flex flex-row items-center justify-between gap-[20px]'>
          <div className="bg-red-600 text-white w-[150px] rounded-[20px] text-center">{props.classTeacher}</div>
          <div className="bg-red-600 text-white w-[100px] rounded-[20px] text-center">{props.timepassed}</div>
          </div>
          <div className="thumbnailsection flex justify-center items-center">
            <img
              src={props.image}
              alt=""
              className="rounded-[20px] my-[20px] w-[150px] h-[130px] sm:w-[210px] sm:h-[130px] "
            />
          </div>
          <div className="teacher">{props.classTitle} </div>
          <div className="Livestudents">Students Watching {livestudents}</div>
          <button  className='bg-green-600 text-white w-[100px] h-[30px] rounded-[40px]' ><Link to={`/Room/${props.classTeacher}/${props.idpassed}`}>Watch Now</Link></button>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="bg-green-500 rounded-[20px] w-[230px] ml-[100px] mb-[30px] text-[25px] px-[3%]">
        Live Classes
      </div>
      <div className="liveclassescarousel w-[100vw] h-[300px] grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
  {data2.map(item =>(
    <Liveclasscard key={item._id} image={item.thumbnail} timepassed={item.classTime} idpassed={item._id} className='col-span-1' classTeacher={item.classTeacher} classTitle={item.classTitle} />
  ))}
      </div>
      {/* <button onClick={handleallclassesdata} className=" m-[30px] w-[150px] h-[50px] bg-red-400 text-white rounded-[20px] ">getLiveclasses</button> */}
    </>
  );
};

export default LiveClasses;
