import React, { useRef, useState } from "react";
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";

const Compiler = () => {
    let [htmlcode,setHtmlCode]=useState();
    let [csscode,setCsscode]=useState();
    let [jscode,setJscode]=useState();
    const outputRef = useRef(null);
    const run=()=>{
        const output = outputRef.current;
        if (output) {
          const document = output.contentDocument;
          document.body.innerHTML = `${htmlcode}<style>${csscode}</style>`;
          const script = document.createElement("script");
          script.innerHTML = jscode;
          document.body.appendChild(script);
        }
    }
  return (
    <>
      <div className="flex text-center justify-center font-bold text-slate-700 text-[40px]">Live Editor</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 ">
        <div className="flex flex-col border-white border-[3px]">
          <div className="bg-blue-900 flex items-center justify-center text-white text-[20px] text-center">HTML <FaHtml5/></div>
          <textarea className="h-[45vh] p-[20px] bg-gray-800 text-white flex items-center justify-center" onKeyUp={run()} onChange={(e)=>setHtmlCode(e.target.value)} >
            {" "}
          </textarea>
        </div>
        <div className="flex flex-col border-white border-[3px]">
        <div className="bg-blue-900 flex items-center justify-center text-white text-[20px] text-center">CSS <FaCss3Alt/></div>
          <textarea className="h-[45vh] p-[20px] bg-gray-800 text-white flex items-center justify-center" onChange={(e)=>setCsscode(e.target.value)}  onKeyUp={run()} >
            {" "}
          </textarea>
        </div>
        <div className="flex flex-col border-white border-[3px]">
        <div className=" flex items-center justify-center bg-blue-900 text-white text-[20px] text-center">JavaScript <RiJavascriptFill/> </div>
          <textarea className="h-[45vh] p-[20px]  bg-gray-800 text-white flex items-center justify-center"  onKeyUp={run()} onChange={(e)=>setJscode(e.target.value)}  >
            {" "}
          </textarea>
        </div>
      </div>
      <div className="h-[50vh] mx-[10px]"> <div className=" text-[40px]  text-slate-800 font-bold text-center ">Output</div><iframe id='output' ref={outputRef} className="w-[100%] h-[50vh] border-[3px] border-slate-800" src="" frameborder="0"></iframe></div>
    </>
  );
};

export default Compiler;
