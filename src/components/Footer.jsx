import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="grid h-[300px] text-white grid-cols-12 border-[3px] border-gray-200 my-[40px] flex justify-center items-center  ">
      <div className="col-span-4  m-[20px] px-[20px] flex justify-center flex-col items-center">
        <div className="text-[20px]">
          <Link to="/">Home</Link>
        </div>
        <div className="text-[20px]">
          <Link to="/createliveclasses">Live</Link>
        </div>
        <div className="text-[20px]">
          <Link to="/SearchResults"></Link>Search
        </div>
        <div className="text-[20px]">
          <Link></Link>Services
        </div>
        <div className="text-[20px]">Your Courses</div>
      </div>
      <div className="col-span-4 flex flex-col  m-[20px]">
        <div>Office Location</div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.456962232359!2d73.83174837491659!3d18.46294927093245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b405ac494d45%3A0xc302bc70566bb0f8!2sIndian%20Institute%20of%20Information%20Technology%2C%20Pune!5e0!3m2!1sen!2sin!4v1711463887048!5m2!1sen!2sin"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="col-span-4  m-[20px] flex justify-center flex-col items-center">
        <h3>Contact Us</h3>
        <p>
          123 Street Name
          <br />
          City, State, Zip
          <br />
          info@example.com
          <br />
          (123) 456-7890
        </p>
      </div>
    </div>
  );
};

export default Footer;
