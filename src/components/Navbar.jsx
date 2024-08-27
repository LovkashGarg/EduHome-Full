import React, { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import { getByLabelText } from '@testing-library/react';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import ThemeContext from '@mui/styled-engine';

const Navbar = ({sendRoletoHome}) => {
  const [Email,setEmail]=useState('No Email');
  const [Role,setRole]=useState('Role');
  
  useEffect(()=>{
    getToken();
    sendRoletoHome(Role);
  },[])

  const getToken= async(req,res)=>{
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userrole');
    // const storedToken=Cookies.get('token');
// console.log(storedToken);
//     console.log("hello " +storedToken);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/auth/${storedRole}`, 
      {
        params: {
            token: storedToken 
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
     if(response.status ==200){
      // console.log("Successfully fetched details", response.data);
      console.log(response.data);
      const jsonresponse=await response.data;
      // console.log(jsonresponse);
      // console.log(jsonresponse.userdata);
     
      const realdata=jsonresponse.userdata;
      setEmail(realdata.email);
      setRole(realdata.role);
      if(Email){
    setshowsignup(false);
    localStorage.setItem('email',realdata.email);
     }
     
  }
  } catch (error) {
      console.error(error);
  }
  }
  const logoutandcleartoken=()=>{
    const storedTokenremoved = localStorage.removeItem('token');
    console.log("TOken removed");
    setshowsignup(true);
    setEmail('');
    setRole('');
  }
  const [showsignup,setshowsignup]=useState(true);
  const navigate=useNavigate();
  
  return (<>
    <nav className='grid grid-cols-12 bg-black '>
<div className='sm:col-span-2  min-h-[60px] text-start text-[30px] px-[40px] py-[20px] text-white flex items-center '>
    <div className="menubutton  block sm:hidden m-[5px] "><img src="https://static.thenounproject.com/png/356889-200.png" alt="" /></div>
    EduHome
</div>

<div className='routes hidden sm:col-span-6 min-h-[60px] sm:flex sm:flex-row sm:justify-end  sm:block  text-[24px] text-black mx-[15px] '>
    <div className='m-[20px] text-white hover:bg-gray-400 mx-[7px] px-[10px] rounded-[20px]'><Link to='/'>Home</Link></div>
     {Role=='Student'? <div className='m-[20px] mx-[10px] text-white px-[10px] hover:bg-gray-400 rounded-[20px] px-[5px]'>Cart</div> : Role==='Teacher' ? <div className='m-[20px] text-white hover:bg-gray-400 rounded-[20px] px-[5px] mx-[10px] '><Link to='/TeacherDashboard'>DashBoard</Link></div> :null}
    {Role==='Student' ?<div className='m-[20px] mx-[10px] text-white px-[10px] hover:bg-gray-400 rounded-[20px] px-[5px]'> <Link to='/GenerateMockTests'> Mock Tests</Link></div> 
    : Role==='Teacher'? (<div className='m-[20px] mx-[6px] text-white px-[10px] hover:bg-gray-400 rounded-[20px] '><Link to='/createliveclasses'>Create Live</Link></div>)
    :null
      }

        {Role=='Student'? <div className='m-[20px] ml-[10px] text-white px-[10px]  hover:bg-gray-400 rounded-[20px] '><Link to='/SearchResults'>Search </Link></div> : Role==='Teacher' ? <div className='my-[20px] text-white mx-[10px] hover:bg-gray-400 rounded-[20px] px-[5px]'><Link to={`/CourseCreationForm/${Email}`}>Create Course</Link></div> :null}
    <div className='m-[20px] mx-[10px] px-[10px] hover:bg-gray-400 text-white rounded-[20px]  '><Link to='/profile '> Profile </Link></div>
</div>
<div className='sm:col-span-2 min-h-[60px] hidden  sm:block sm:flex  sm:items-center sm:justify-center mr-[10px] '>
    <Link className={`${showsignup? "show":"hidden"} text-white bg-pink-500 min-w-[80px] sm:text-[20px] md:text-[24px] sm:px-[20px] sm:min-w-[130px] text-white shadow rounded-lg`} to='/signup' >SignUp</Link>
    <button className={`${!showsignup? "show":"hidden"} bg-pink-500 min-w-[80px] sm:text-[20px] md:text-[24px] sm:px-[10px] sm:min-w-[130px] text-white shadow rounded-lg`} onClick={logoutandcleartoken} >LogOut</button>
</div>

<div className='flex flex-col items-center text-center justify-center'>

{/* Here Function is made automaticalyy if we donot use ()= > when the page re renders  */}
<div className='bg-orange-600 ml-[30px]  my-[10px] w-[240px] text-white flex items-center text-center justify-center'>{Email}</div>
<div className='bg-green-500 ml-[30px] mb-[10px]  w-[240px] text-white flex items-center justify-center'>{Role}</div>
</div>
{/* <button onClick={getToken}>Click me</button> */}
    </nav>
   
    </>
  )
}

export default Navbar