import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
// import { TextFields } from '@mui/icons-material';
const CourseCreationForm = () => {
  const [active,setactive]=useState(1);
  const [courseData, setCourseData] = useState({
   
    courseName: '',
     category: '',
    price: '',
    HoursofContent: '',
    paidOrFree: '',
    textcontent:''
  });
 
  // formData.append('thumbnail', file);

  const [file,setfile]=useState();
const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourseData(courseData);
    setactive(2);
    navigate('/')
    // Send courseData to backend or handle form submission
    console.log(courseData.paidOrFree);
  };
   const CourseContentFillupForm =()=>{
    const [textFields, setTextFields] = useState([]);
    const [imageFields,setImageFields]=useState([]);

    const handleText = (e) => {
      e.preventDefault();
      setTextFields([...textFields, '']); // Add an empty string to the textFields array
    };
  
    const [text, setText] = useState('');

    const handleTextFieldChange = (index, value) => {
      const updatedTextFields = [...textFields];
      updatedTextFields[index] = value;
      setText(value);
      setTextFields(updatedTextFields);
    };
  
    const formData = new FormData();
    formData.append('courseName',courseData.courseName);
    formData.append('category', courseData.category);
    formData.append('price', courseData.price);
    formData.append('classType', courseData.HoursofContent);
    formData.append('textcontent',courseData.textcontent);
    
    const calculateHeight = () => {
      // Calculate the number of rows based on the number of lines of text
      const rows = Math.max(text.split('\n').length, 1);
      // Set a minimum height for the textarea
      const minHeight = 30; // in pixels
      // Calculate the total height of the textarea
      const totalHeight = rows * 20 + minHeight;  // Adjust this value according to your needs
      return totalHeight;
    };
    const handleImage=()=>{
      setImageFields(...imageFields,'');
    }
  //   const handleImageChange=(index,value)=>{
  //    const updatedImageFields=[...imageFields];
  //    updatedImageFields[index]=value;
  //    setImageFields(updatedImageFields);
  //  }
    const handleVideos=()=>{
      
    }
    const handleSubmit2=async(e)=>{
      e.preventDefault();
      try{
        const submitalldata=await axios.post("http://localhost:5000/api/v1/course/createCourse",{
          courseData,textFields})
       console.log(submitalldata.json());
      }
      catch(err){
        console.log(err)
      }
     console.log("Sent data successfully");
      navigate('/');
    }
    return(
      <>
      {/* <Navbar/> */}
         <form onSubmit={handleSubmit2} className={`max-w-lg mx-auto ${active === 2 ? "show":"hidden"}`}>
      <div className='flex justify-evenly items-center my-[20px] text-white '>  
      <button className='p-[10px] rounded-[20px]  bg-green-600 ' onClick={handleText}> + Add Text  </button>
      <button className='p-[10px] rounded-[20px]  bg-green-600 ' onClick={handleVideos}> + Add Videos </button>
      <button className='p-[10px] rounded-[20px]  bg-green-600 ' onClick={handleImage}> + Add Images</button>
      </div>
      <div className='flex flex-col items-center justify-center gap-8'>
      {textFields.map((value, index) => (
        <textarea
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleTextFieldChange(index, e.target.value)}
          placeholder="Enter text..."
          className='border-[2px] border-green-400 w-[700px] h-auto px-[10px]  min-h-30px resize-none '
          style={{ height: calculateHeight() + 'px' }}
        /> 
      ))}
      {/* {imageFields.map((value,index)=>(
        <div>
         <input key={index} type='text' onChange={handleImageChange}/>
        <iframe src={value} />
        </div>
      ))} */}
       <button type='submit' className=' flex justify-center items-center p-[10px] rounded-[20px]  bg-green-600 ' >Submit</button>
      </div>
      </form>
      </>
    )
   }
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold m-8 text-center">Create a Course</h1>
     <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center'>Progress - Bar</div>
      <div className='flex flex-row items-center'>
      <div className={`rounded-[20px] w-[60px] h-[60px] p-[20px] ${active===1 ?"bg-green-400": "bg-blue-400"}`}>1</div>
      <div className="line">---------------------------</div>
      <div className={`rounded-[20px] w-[60px] h-[60px] p-[20px] ${active===2 ?"bg-green-400": "bg-blue-400"}`}>2</div>
      </div>
      </div> 

      <form onSubmit={handleSubmit} className={`max-w-lg mx-auto ${active===1 ? "show":"hidden"}`}>
       
        <div className="my-4 flex flex-row">
          <label htmlFor="courseName" className="block font-medium mb-2">Course Name</label>
          <input type="text" id="courseName" name="courseName" value={courseData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4  flex flex-row gap-20">
          <label htmlFor="Category" className="block font-medium mb-2">Category</label>
          <select name="Category" value={courseData.Category}  onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
            <option value='Science'>Science</option>
            <option value='Maths'>Maths</option>
            <option value='English'>English</option>
          </select>
        </div>
        <div className="mb-4 flex flex-row">
          <label htmlFor="paidOrFree" className="block font-medium mb-2">Paid or Free</label>
          <select id="paidOrFree" name="paidOrFree" value={courseData.paidOrFree} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
            <option value="paid">Paid</option>
            <option value="free">Free</option>
          </select>
        </div>
        <div className={`mb-4 flex flex-row  ${courseData.paidOrFree === "free" ? 'hidden':'show'}`}>
          <label htmlFor="price" className="block font-medium mb-2">Price</label>
          <input type="text" id="price" name="price" value={courseData.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4 flex flex-row">
          <label htmlFor="time" className="block font-medium mb-2">Hours of Content</label>
          <input type="text" id="time" name="time" value={courseData.time} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <input type="file"  placeholder='thumbnail' onChange={(e)=>{setfile(e.target.files[0])}} />
        {/* <div className="mb-4">
          <label htmlFor="courseContent" className="block font-medium mb-2">Course Content</label>
          {/* <textarea id="courseContent" name="courseContent" value={courseData.courseContent} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"></textarea> */}
        {/* </div> */} 
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Create Course</button>
      </form>
      <CourseContentFillupForm/>
    </div>
  );
};

export default CourseCreationForm;
