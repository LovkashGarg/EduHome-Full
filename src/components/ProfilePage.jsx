import React, { useEffect, useState,useNavigate } from 'react';
import { useUser } from './UserDataContext';
const ProfilePage = () => {
    const [ImageUrl,setImageUrl] =useState();
    const user=useUser();
    // const navigate=useNavigate();
    const profileImage=()=>{
        const imageUrl=localStorage.getItem('image');
        setImageUrl(imageUrl);
    }
    useEffect(()=>{
        profileImage();
    },[])
    if (!user) {
        return <div>Loading...</div>; // You can also return a loading indicator or redirect to another page
      }
 
  
    const logoutandcleartoken=()=>{
        const storedTokenremoved = localStorage.removeItem('token');
        localStorage.removeItem('image')
        localStorage.removeItem('userrole');
        console.log("Token removed");
        // navigate('/')
      }
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden  border-green-400 border-[2px] p-[20px] ">
        {/* User Avatar */}
        <div className="flex justify-center mt-8">
         {ImageUrl &&  <img
            className="w-32 h-32 rounded-full object-cover"
            src={ImageUrl}
            alt="User Avatar"
          />
         }
        </div>

        {/* User Information */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-800">{user.email}</h2>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>

        {/* Courses/Activities */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">My Courses</h3>
          <ul>
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <h4 className="text-gray-800">Introduction to Physics</h4>
                <p className="text-sm text-gray-500">Instructor: Prof. Smith</p>
              </div>
              <button className="text-blue-500">View</button>
            </li>
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <h4 className="text-gray-800">Mathematics Fundamentals</h4>
                <p className="text-sm text-gray-500">Instructor: Dr. Johnson</p>
              </div>
              <button className="text-blue-500">View</button>
            </li>
            {/* Add more courses/activities as needed */}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-6">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={logoutandcleartoken}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
