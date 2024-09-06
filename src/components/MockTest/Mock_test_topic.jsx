import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Mock_test_topic = () => {
    const [topic,setTopic]=useState('');
    
  return (
    <div className='w-[100%] h-[100%] bg-black py-[10%]'>
    <div className='text-[30px] flex items-center justify-center w-[390px] bg-green-400 rounded-[30px] text-white text-center m-auto pt-[2%] pb-[2%]'>MOCK HUB </div>
    <div className='w-[100%] h-[100vh] bg-black'>
    <div className='flex flex-col gap-4 mb-[10%]  mx-[30%] w-[40%] h-[100vh] justify-items-center text-center'> 
    <h1 class="text-4xl py-[20px] font-bold tracking-tight mt-[30px] h-[80px] leading-none mb-4 bg-white text-gray-900">Select a Topic</h1>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' onClick={(e)=> setTopic("Python Programming")}><Link to='MockTest/Python-MockTest' >Python Programming</Link></button>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' onClick={(e)=> setTopic("Object Oriented Programming")}><Link to='MockTest/OOPS-MockTest' >Object Oriented Programming</Link></button>
        {/* <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' onClick={(e)=> setTopic("Database Management System")}><Link to='MockTest/DBMS-MockTest' >Database Management System</Link></button> */}
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'onClick={(e)=> setTopic("Data Structure and Algorithm")}><Link to='MockTest/DSA-MockTest' >Data Structure and Algorithm</Link></button>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'  onClick={(e)=> setTopic("System Design")}> <Link to='MockTest/SYS_DES-MockTest'>System Design</Link></button>
    </div>
    </div>
    </div>
  )
}

export default Mock_test_topic