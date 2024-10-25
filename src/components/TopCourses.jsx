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

  // useEffect(() => {
  //   displayallCourses();
  // }, []);
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
    const [orderId, setOrderId] = useState(null);
  
  
    const handlePayment = async () => {
      try {
        const response = await axios.post('http://localhost:5000/create-order', {
          amount: 99900, // Replace with your dynamic amount if needed
          currency: 'INR',
          receipt: 'order_rcptid_' + Math.random().toString(36).substring(2, 15), // Generate a random receipt ID
        });

        setOrderId(response.data.id);
      } catch (error) {
        console.log("something wrong happened")
      }
    };
  
    useEffect(() => {
  
      if (orderId) {
        const options = {
          "key": process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID from environment variable
          "amount": 99900, // Use the order ID as the amount for Razorpay checkout
          "currency": "INR",
          "name": "EduHome", // Replace with your company name
          "description": "Payment for your purchase",
          "image": "https://your-company-logo.com/logo.png", // Replace with your company logo URL (optional)
          "prefill": {
            "name": "Customer Name", // Replace with a way to get customer name (optional)
            "email": "customer@example.com", // Replace with a way to get customer email (optional)
          },
          "theme": {
            "color": "#3399cc", // Customize the checkout button color (optional)
          },
          "handler": function (response) {
            console.log(response); // Handle payment response (success or failure)
            // You can update your order status or handle other actions based on response
  
            // Example check for successful payment:
            if (response.razorpay_payment_id) {
              alert("payment successful");
              // Payment successful!
              // Send a confirmation email or update order status in your backend
            } else {
              // Payment failed
              // Handle payment failure scenario (e.g., display error message)
            }
          },
        };
  
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    }, [orderId]);
  
    const [enrolledstudents, setEnrolledstudents] = useState(1);

    return (
      <>
        <div className="text-white w-[250px] h-[350px] sm:w-[330px] sm:h-[330px] border-[3px] rounded-[30px] border-green-500 flex flex-col flex flex-col items-center justify-center   ">
          <div className="text-white teacher text-[25px]">John Doe</div>
          <div className="text-white thumbnailsection flex justify-center items-center">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="rounded-[10px] w-[150px] h-[150px] sm:w-[210px] sm:h-[150px] "
            />
          </div>
          <div className="text-white flex  my-[10px] gap-5">
            <div className="bg-red-600 text-white text-[20px]  rounded-[20px] w-[220px] text-center ">
              Video Editing by John
            </div>
            <p className="text-white text-[20px] bg-green-700 rounded-[10px] px-[10px] ">
              ₹999
            </p>
          </div>
          <div className="Livestudents text-white">
          {props.enrolledstudents}
            Enrolled By :  10 Students
          </div>
          <button type="submit" className="bg-green-700 text-[20px] rounded-[20px] w-[180px]" onClick={handlePayment} >Buy Now</button>
          {/* <button
            className="bg-green-600 text-white w-[140px] h-[30px] rounded-[40px]"
            onClick={() => {
              setDatatosend(props.teacher);
              sendDataToParentHandler();
            }}
          >
           {/* <Link to={`/Course/${props.courseName}/${props.idpassed}`}>Watch Course</Link> */}
          {/* </button> */} 

        </div>
      </>
    );
  };
  const topcourses=[1,1,1,1];
  return (
    <>
      <div className=" h-[50px] bg-yellow-500 rounded-[20px] w-[290px] ml-[100px] mb-[30px] text-[30px] px-[3%]  ">
        Top Courses
      </div>

      <div className="TopCoursesCarousel grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topcourses.map((index)=>
          (
           <TopCoursescard key={index} ></TopCoursescard>
          )
        )
      }
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
