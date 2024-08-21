import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const TeacherDashboard = () => {
  const [email,setEmail]=useState();
  const [classData, setclassData] = useState([]);
  const [courseData,setCourseData]=useState([]);
  useEffect(() => {
    fetchMyclasses();
    fetchMycourses();
  }, []);
  const fetchMycourses=async(req,res)=>{
    const storedEmail=localStorage.getItem('email');
    setEmail(storedEmail);
    const mycourses = await axios.get(
      "http://localhost:5000/api/v1/course/showMycourses", {
        params: {
            email:storedEmail, 
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const mycoursesdata = mycourses.data;
    // console.log(mycoursesdata);
    setCourseData(mycoursesdata);
  }
  const fetchMyclasses = async (req, res) => {
    const myclasses = await axios.get(
      "http://localhost:5000/api/v1/classes/MyclassDisplay"
    );
    const myclassesdata = myclasses.data;
    // console.log(typeof courseData);

    setclassData(myclassesdata);
    // console.log(myclassesdata);
    // console.log(typeof courseData);

  };

  const ClassCard = (props) => {
    return (
      <div className="rounded w-[350px] overflow-hidden w-[300px] shadow-lg flex justify-center ">
        <img className="w-[200px] h-[150px]" src={props.classImage} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.classTitle}</div>
          <p className="text-gray-700 text-base mb-2">
            Scheduled at : {props.classTime}
          </p>
          <p className="text-gray-700 text-base">{props.classCategory}</p>
        </div>
      </div>
    );
  };

  const CourseCard = (props) => {
    return (
      <div className="rounded overflow-hidden w-[300px]  flex items-center flex-col justify-center shadow-lg">
        <img className="w-[280px] h-[150px]" src={props.thumbnail }/>
        <div className="px-6 flex justify-between gap-8 my-[10px]">
          <div>
          <div className="text-xl">{props.courseName}</div>
          <p className="text-gray-700 text-base">{props.Category}</p>
          </div>
          <div>
          <p className="text-white text-[30px] bg-green-700 rounded-[10px] px-[20px] ">₹{props.price}</p>
          </div>
        </div>
        <p className="text-gray-900 text-base mb-2">
            {props.courseDescription}
          </p>
      </div>
    );
  };
  return (
    <div className="flex ">
      {/* Sidebar */}
      <div className="bg-green-500 text-white w-64 flex flex-col">
        <div className="py-4 px-6 bg-gray-900">
          <h1 className="text-2xl ">Teacher Dashboard</h1>
          <p className="mt-2 text-md">Welcome, {email}</p>
        </div>
        <nav className="mt-6">
          <Link
            to="/Profile"
            className="block py-2 px-4 text-white text-[20px]  hover:bg-pink-700"
          >
            Profile
          </Link>
          <a
            href="#"
            className="block py-2 px-4 text-white text-[20px] hover:bg-pink-700"
          >
            Courses
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-white text-[20px] hover:bg-pink-700"
          >
            Students
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-white text-[20px] hover:bg-pink-700"
          >
            Grades
          </a>
          {/* Add more navigation links as needed */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-200 p-10">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-3 mb-5">
          { Object.values(courseData).map((item, index) => (
            <CourseCard Category={item.Category} 
                price={item.price} courseName={item.courseName} courseDescription={item.courseDescription} thumbnail={item.thumbnail}  key={index} 
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">My Classes</h2>
        <div className="grid grid-cols-3 gap-6 ">
          {classData.map((item, index) => (
            <ClassCard
              key={index}
              classCategory={item.classCategory}
              classTime={item.classTime}
              classImage={item.thumbnail}
              classTitle={item.classTitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
