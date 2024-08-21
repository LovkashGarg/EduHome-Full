import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Signup = () => {
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Role, setRole] = useState("Student");
  const [Imageurl,setImageUrl]=useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      localStorage.setItem('image', base64String);
      setImageUrl(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
const navigate=useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const mydata = {
      name: Username,
      email: email,
      password: password,
      role: Role,
    };
    let res = await fetch("http://localhost:5000/api/v1/auth/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body:JSON.stringify(mydata)
    });
    let resjson=await res.json();
    if(res.status===200){
      navigate('/');
    }

    console.log(resjson);
    console.log(mydata);

    // try {
    //    const response = 1;

    //    if (response.ok) {
    //      const data = await response.json();
    //      console.log('Signup successful:', data);
    //      // Perform any necessary actions after successful signup
    //    } else {
    //      console.error('Signup failed:', response.statusText);
    //      // Handle signup failure
    //    }
    //  } catch (error) {
    //    console.error('Error:', error);
    //    // Handle network errors or other exceptions
    //  }
  };
  return (
    <>
      <div className="signupcontainer w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <h1>Signup</h1>
        <form
          onSubmit={handlesubmit}
          className=" flex flex-col border-[2px]  rounded-[20px] items-center justify-center w-[400px] h-[400px] bg-teal-500 border-teal-400 shadow"
        >
          <label htmlFor="Username" className="w-[300px]  my-[10px]">
            Username:{" "}
            <input
              type="text"
              name="Username"
              id="username"
              className=" px-[10px]"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />{" "}
          </label>
          <label htmlFor="Email" className="w-[300px] my-[10px] ">
            {" "}
            Email:
            <input
              type="email"
              name="Email"
              id="Email"
              className=" px-[10px]"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />{" "}
          </label>
          <label htmlFor="password" className="w-[300px]  my-[10px]">
            Password:{" "}
            <input
              type="password"
              name="password"
              className=" px-[10px]"
              id="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </label>
          <label htmlFor="role" className="w-[300px]  my-[10px]">
            Role:{" "}
            <select
              name="Role"
              id=""
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </label>
          <input type="file" accept="image" className="my-[10px] px-[10px]"  onChange={handleImageChange}/>
          <button type="submit" className=" bg-red-600 text-white w-[200px] rounded-[20px] ">Submit</button>
         <Link to='/login'> <button  className="bg-pink-600 text-white w-[250px] m-[20px]  rounded-[20px]">Already Signed Up ? </button></Link>
        </form>
        {/* {Imageurl && <img src={Imageurl} alt="Uploaded" style={{ width: '200px', height: '200px' }} />} */}
      </div>
    </>
  );
};

export default Signup;
