import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
const [Token,setToken]=useState("");
  const navigate = useNavigate();
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    const mydata = {
      email: email,
      password: password,
    };
    let res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(mydata),
    });
    const data = await res.json();
      // const tokenFromResponse = data.token; // Assuming token is returned in the response JSON
const tokenFromResponse= data.token;
const userrole=data.user.role;
      console.log( "data from Backend" +tokenFromResponse)
      // Store token in local storage
      localStorage.setItem('token', tokenFromResponse);
      localStorage.setItem('userrole',userrole);

      // Do something with the user data if needed
      // const user = data.user;

      // Set token state
      setToken(tokenFromResponse);
    console.log(Token);    
    navigate('/') ;
  };
  return (
    <>
      <div className="signupcontainer w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <h1 className="text-[30px] bg-teal-500 rounded-[20px] my-[10px] text-white w-[200px] text-center ">Login</h1>
        <form
          onSubmit={handlesubmit}
          className=" shadow-lg  flex flex-col border-[2px]  rounded-[20px] items-center justify-center w-[400px] h-[300px]  bg-teal-500 border-teal-400 shadow"
        >
          <label htmlFor="Email" className="w-[300px]  my-[10px]  flex items-center justify-center ">
            {" "}
            Email:
            <input
              type="email"
              name="Email"
              id="Email"
              className="px-[10px]"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />{" "}
          </label>
          <label htmlFor="password" className="w-[300px] px-[10px] flex items-center justify-center my-[10px]">
            Password:{" "}
            <input
              type="password"
              name="password"
              id="password"
              className="px-[10px]"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </label>

          <button
            type="submit"
            className=" bg-red-600 text-white w-[200px] rounded-[20px] "
          >
            Submit
          </button>
          <Link to="/Signup">
            {" "}
            <button className="bg-pink-600 text-white w-[150px] m-[20px]  rounded-[20px]">
              First Time ?{" "}
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
