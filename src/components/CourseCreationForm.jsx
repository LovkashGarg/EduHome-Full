import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseCreationForm = () => {
  const [active, setActive] = useState(1);
  const [courseData, setCourseData] = useState({
    courseName: "",
    category: "",
    price: "",
    HoursofContent:"",
    paidOrFree:"",
    textcontent:""
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(2);
    console.log(courseData);
  };

  const CourseContentFillupForm = () => {
    const [textFields, setTextFields] = useState([]);
    const [imageFields, setImageFields] = useState([]);

    const handleText = (e) => {
      e.preventDefault();
      setTextFields([...textFields, '']);
    };

    const handleTextFieldChange = (index, value) => {
      const updatedTextFields = [...textFields];
      updatedTextFields[index] = value;
      setTextFields(updatedTextFields);
    };

    const handleImage = () => {
      setImageFields([...imageFields, '']);
    };

    const handleSubmit2 = async (e) => {
      e.preventDefault();
      const formDatacourse = new FormData();
      formDatacourse.append('courseName', courseData.courseName);
      formDatacourse.append('category', courseData.category);
      formDatacourse.append('price', courseData.price);
      formDatacourse.append('HoursofContent', courseData.HoursofContent);
      formDatacourse.append('paidOrFree', courseData.paidOrFree);
      formDatacourse.append('textcontent', JSON.stringify(textFields));

      if (file) {
        formDatacourse.append('thumbnail', file);
      }

      try {
        const response = await axios.post("http://localhost:5000/api/v1/course/createCourse", formDatacourse, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit2} className={`max-w-lg mx-auto ${active === 2 ? "show" : "hidden"} `}>
          <div className='text-[25px] flex justify-evenly items-center my-[20px] text-white '>
            <button className='text-[25px] p-[10px] rounded-[20px] bg-green-600' onClick={handleText}>+ Add Text</button>
            <button className='text-[25px] p-[10px] rounded-[20px] bg-green-600' onClick={handleImage}>+ Add Images</button>
          </div>
          <div className='text-[25px] flex flex-col items-center justify-center gap-8'>
            {textFields.map((value, index) => (
              <textarea
                key={index}
                value={value}
                onChange={(e) => handleTextFieldChange(index, e.target.value)}
                placeholder="Enter text..."
                className='border-[2px] border-green-400 w-[700px] h-auto px-[10px] min-h-30px resize-none '
                style={{ height: `${Math.max(value.split('\n').length, 1) * 20 + 30}px` }}
              />
            ))}
            <button type='submit' className='text-white p-[10px] rounded-[20px] bg-green-600'>Submit</button>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className="text-[25px] container mx-auto">
      <h1 className="text-[25px] text-3xl font-bold m-8 text-center">Create a Course</h1>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-[25px] flex justify-center items-center'>Progress - Bar</div>
        <div className='flex flex-row items-center'>
          <div className={`rounded-[20px] w-[60px] h-[60px] p-[20px] ${active === 1 ? "bg-green-400" : "bg-blue-400"}`}>1</div>
          <div className="line">---------------------------</div>
          <div className={`rounded-[20px] w-[60px] h-[60px] p-[20px] ${active === 2 ? "bg-green-400" : "bg-blue-400"}`}>2</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`text-[25px] max-w-lg mx-auto ${active === 1 ? "show" : "hidden"}`}>
        <div className="my-4">
          <label htmlFor="courseName" className="text-[25px] block font-medium mb-2">Course Name</label>
          <input type="text" id="courseName" name="courseName" value={courseData.courseName} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="Category" className="text-[25px] block font-medium mb-2">Category</label>
          <select name="category" value={courseData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
            <option value='Science'>Science</option>
            <option value='Maths'>Maths</option>
            <option value='English'>English</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="paidOrFree" className="block  text-[25px] font-medium mb-2">Paid or Free</label>
          <select id="paidOrFree" name="paidOrFree" value={courseData.paidOrFree} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
            <option value="paid">Paid</option>
            <option value="free">Free</option>
          </select>
        </div>
        <div className={`mb-4 ${courseData.paidOrFree === "free" ? 'hidden' : ''}`}>
          <label htmlFor="price" className="block text-[25px] font-medium mb-2">Price</label>
          <input type="text" id="price" name="price" value={courseData.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-[25px] font-medium mb-2">Hours of Content</label>
          <input type="text" id="time" name="HoursofContent" value={courseData.HoursofContent} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4  mt-[20px] rounded-md hover:bg-blue-600">Create Course</button>
      </form>
      <CourseContentFillupForm />
    </div>
  );
};

export default CourseCreationForm;
