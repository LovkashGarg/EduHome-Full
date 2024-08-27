import React, { useEffect, useState } from "react";
import Courses from "./Student.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const TopCourses = ({ sendDataToparent }) => {
  const [Courses, setCourses] = useState([]);
  const [DataTosend, setDatatosend] = useState("");
  const sendDataToParentHandler = () => {
    sendDataToparent(DataTosend);
  };
  useEffect(() => {
    displayallCourses();
  }, []);
  const displayallCourses = async () => {
  
    try {
      const alltopcoursesResponse = await fetch(
        "http://localhost:5000/api/v1/course/alltopcourses"
      );
      // const jsondata = await alltopcoursesResponse.json();
      //  console.log(jsondata)
      // setCourses(jsondata.allCourses);
      // Courses.forEach((course) => {
      //   console.log("Course ID:", course._id);
      //   console.log("Course Name:", course.courseName);
      //   console.log("Course Description:", course.courseDescription);
      //   console.log("Instructor Name:", course.Instructor.name);
      //   console.log("Price:", course.price);
      //   console.log("Students Enrolled:", course.studentsEnrolled);
      //   console.log("Thumbnail URL:", course.thumbnail);
      // });
      // console.log(Courses);
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  };
  
  const TopCoursescard = (props) => {
  
    const [enrolledstudents, setEnrolledstudents] = useState(1);

    return (
      <>
        <div className="w-[250px] h-[350px] sm:w-[300px] sm:h-[350px]  mx-[50px] border-[3px] rounded-[30px] border-green-500 flex flex-col flex flex-col items-center justify-center ">
          <div className="teacher">Sandeep Sharma</div>
          <div className="thumbnailsection flex justify-center items-center">
            <img
              src={props.image}
              alt=""
              className="rounded-[10px] w-[150px] h-[150px] sm:w-[210px] sm:h-[150px] "
            />
          </div>
          <div className="flex  my-[10px] gap-5">
            <div className="bg-red-600 text-white text-[20px]  rounded-[20px] w-[150px] text-center ">
              {/* {props.courseName} */}
            </div>
            <p className="text-white text-[20px] bg-green-700 rounded-[10px] px-[10px] ">
              {/* ₹{props.price} */}
            </p>
          </div>
          <div className="Livestudents">
          {/* {props.enrolledstudents} */}
            Enrolled By :  Students
          </div>
          <button
            className="bg-green-600 text-white w-[140px] h-[30px] rounded-[40px]"
            onClick={() => {
              setDatatosend(props.teacher);
              sendDataToParentHandler();
            }}
          >
           {/* <Link to={`/Course/${props.courseName}/${props.idpassed}`}>Watch Course</Link> */}
          </button>
        </div>
      </>
    );
  };
  return (
    <>
      <div className=" bg-yellow-500 rounded-[20px] w-[230px] ml-[100px] mb-[30px] text-[25px] px-[3%]">
        Top Courses
      </div>

      <div className="TopCoursesCarousel grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Courses.map((data, index) => (
          <>
            <TopCoursescard
              key={index}
              idpassed={data._id}
              className="col-span-1"
              courseName={data.courseName}
              InstructorName={data.Instructor.name}
              enrolledstudents={data.studentsEnrolled}
              price={data.price}
              image={data.thumbnail}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default TopCourses;
