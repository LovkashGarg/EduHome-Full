import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const CreateLiveClasses = () => {
    useEffect(()=>{
        findDetail();
    },[])

    const findDetail=async(req,res)=>{


        const tokendata=localStorage.getItem('token');
        const roledata=localStorage.getItem('userrole');
        console.log(tokendata);
        console.log(roledata);
        try{
            const resp = await axios.get(`http://localhost:5000/api/v1/auth/${roledata}`, 
            {
              params: {
                  token: tokendata
              },
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          

          const jsondata= resp.data;
console.log( "Json data " + jsondata.userdata.email);
setClassTeacher(jsondata.userdata.email);
        } catch(err){
            console.error(err);
        }
        // setClassTeacher(resp.userdata.email);
    }

    const [ClassTitle, setClassTitle] = useState('Untitled');
    const [ClassTime, setClassTime] = useState(Date.now);
    const [ClassType, setClassType] = useState('Free');
    
    const [ClassCategory, setClassCategory] = useState('Physics');
    const [ClassTeacher,setClassTeacher]=useState('');
    const [file,setfile]=useState();
const navigate=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('classTeacher',ClassTeacher);
        formData.append('classTitle', ClassTitle);
        formData.append('classTime', ClassTime);
        formData.append('classType', ClassType);
        formData.append('classCategory', ClassCategory);
        formData.append('thumbnail', file);
// const data={
// classTeacher:ClassTeacher,
// classTitle: ClassTitle,
// classTime: ClassTime,
// classType: ClassType,
// classCategory: ClassCategory,
// thumbnail:thumbnail
// }
// console.log(data);
let res=await fetch("http://localhost:5000/api/v1/classes/createliveclasses",{
    method:"POST",
    // headers: { "content-type": "application/json" },
    body:formData
    });
    let resjson=await res.json();
    if(res.status==200){
      navigate('/');
    }
    console.log(resjson);
    // console.log(data);
    }
  return (
  <div className='flex justify-center items-center w-[100vw] h-[100vh] bg-black   '>
   
    <form  className='flex text-white justify-center items-center py-[100px]  ' onSubmit={handlesubmit} >
   
        <div className='text-[25px] flex  flex-col w-[500px] rounded-[30px] gap-[20px] h-[540px] justify-center items-center border-[3px] border-green-500'>
        {ClassTeacher}
        <h2 className='text-[40px] font-mono '>Create Live Classes</h2>
        <label htmlFor="ClassTitle" className='text-[25px] '>Class Title :<input className='text-black text-[25px] ml-[10px] px-[10px]' type="text" name='ClassTitle' placeholder='Carbon and Compounds'  onChange={(e)=>{
        setClassTitle(e.target.value);
        }}/></label>
        <label className='text-[25px] mr-[20px] ' htmlFor="Timescheduled">Time scheduled :<input  className='text-[25px] text-black' type="time" name='Timescheduled'  onChange={(e)=>{
        setClassTime(e.target.value);
        }}/></label>
        <label className='text-[25px] ' htmlFor="Classtype">
        Class Type:
            <select className='text-black text-[25px] ' name="Paid_free"  onChange={(e)=>{
                setClassType(e.target.value);}
            }
                id="Classtype">
                 <option className='text-black text-[25px] ' value="Paid">Paid</option>
                <option className='text-black text-[25px] ' value="Free">Free</option>
            </select>
            </label>
        <label  className='text-[25px] ' htmlFor="ClassCategory">
            Class Category :
            <select className=' text-black text-[25px] ' name="Category" onChange={(e)=>{
                setClassCategory(e.target.value);}
            } id="ClassCategory">
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Maths">Maths</option>
                <option value="Python">Python</option>
            </select>
            </label>
            <input type="file" className='text-[25px] ml-[30px] ' onChange={(e)=>{setfile(e.target.files[0])}} />
            <button type="submit" className='text-[25px] bg-red-600 text-white w-[200px] h-[40px] rounded-[40px]' >Submit</button>
            </div>
    </form>
  </div>
  )
}

export default CreateLiveClasses