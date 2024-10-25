import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Student from "./Student.jpg";
import LiveClasses from "./LiveClasses";
import TopCourses from "./TopCourses";
import Footer from "./Footer";
import CTABUTTON from "./Button";
import tutorvideo from "./tutor.mp4";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
// import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const codeblock = `import React from 'react' \n
   const Home = () =>\n
    {return ( 
      <div>Home</div>
      )
    }`;
  const getscrollimagedata = async (req, res) => {
    const data = await fetch("");
  };

  useEffect(() => {
    receiveDatafromNavbar();
  }, []);
  const receiveDatafromNavbar = (data) => {
    console.log(data);
    setRole(data);
  };
  const [DataforCart,setDataforCart] =useState([]);
  const HandledatafromChild=(data)=>{
    setDataforCart([...DataforCart,data]);
}
  useEffect(()=>{
  HandledatafromChild();
  
  },[])
  
  const Cart =()=>{
    const [CourseSelectedlist,setCourseSelectedlist]=useState('');   
    return (
        <>
        {DataforCart.map((courseitem,index)=>(
<div key={index}> {courseitem}</div>
        ))}
  
        </>
    )
}
  // const getToken=async()=>{
  //   const storedToken = localStorage.getItem('token');
  //   console.log("hello " +storedToken);

  // const  knowuser=await axios.get("http://localhost:5000/api/v1/auth/Teacher",{
  //   params: {
  //     TOKEN: storedToken
  //   },
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }

  // })
  // console.log(knowuser.data);
  // const jsonresponse=await knowuser.data;
  // console.log(jsonresponse);
  // console.log(jsonresponse.data);
  // const realdata=jsonresponse.data;
  // setEmail(realdata.email);
  // setRole(realdata.role)
  // }

  // // this would extract token again and again
  // useEffect(()=>{
  //   getToken();
  // },[email])

  return (
    <body className="bg-black">
      <div >
        <Navbar sendRoletoHome={receiveDatafromNavbar}  />
      </div>
<Cart/>
      <main className="w-[100vw] ">
        <div className="grid mt-[5%] h-[90vh]  sm:h-[80vh] grid-col-1 grid-rows-3  lg:grid-cols-2 ">
          <div className="left bg-slate-200 h-[40vh] sm:h-[45vh] row-span-2 lg:col-span-1 my-[30px] mx-[10%] flex items-center justify-center flex-col border-[2px]  rounded-full">
            <div className="bigtagline text-[30px] px-[20px] md:text-[45px] text-red-800 font-mono">
              Learn with Us
            </div>
            <div className="Description text-[15px] sm:text-[20px] text-black ">
              EduHome is a Edtech Platform which comes with a
              <br /> mission of briging quality Education to Homes.
            </div>
            <div className="buttons my-[15px] flex justify-between">
              <CTABUTTON active={true} linkto={"/signup"}>
                Learn More
              </CTABUTTON>
              <CTABUTTON active={false} linkto={"/signup"}>
                Demo
              </CTABUTTON>
            </div>
          </div>
          <div className="right row-span-1 h-[30vh] lg:col-span-1">
            <img src={Student} alt="" className="mt-[50px] sm:hidden sm:hidden md:block rounded-[50px]  "  />
          </div>
        </div>
        <LiveClasses 
        // className={role === "Teacher" ? "hidden" : "block"} 
        />
        <div className="mt-[100px]  mb-[50px] ">
        <TopCourses sendDataToparent={HandledatafromChild} />
        </div>
        <div className="my-[20px]"></div>
        <section className="flex  flex-col sm:flex-row items-center my-[20px] gap-7 ">
          <div className="flex justify-center flex-col gap-7">
            <div>
              <Link
                to="/signup"
                className="text-[25px] w-[260px] bg-blue-500 rounded-[20px] text-black  px-[3%] ml-[100px] my-[10px] "
              >
                Become A Tutor
              </Link>
            </div>
            <div className="w-[50vw] sm:w-[50vw] rounded-[30px] mx-[40px] ">
              <video
                autoPlay
                src={tutorvideo}
                controls
                className="rounded-[40px] "
              ></video>
            </div>
          </div>
          <div className="sm:w-[40vw] flex  flex  bg-black text-white">
            <div className="w-[10%] m-[0] p-[20px] ">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
            </div>
            <div className="w-[90%] p-[20px] ">
              <TypeAnimation
                sequence={[codeblock, 1000, ""]}
                repeat={Infinity}
                speed={50}
                // style={{  display: "inline-block" }}
                omitDeletionAnimation={true}
                className="text-[25px]"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </body>
  );
};

export default Home;
