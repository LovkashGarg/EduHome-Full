import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active,linkto}) => {
  return (
    <div className={`w-[100px] sm:w-[150px] h-[35px] sm:h-[60px] mx-[20px] text-center flex items-center justify-center font-bold text-white rounded-[20px] text-[15px] sm:text-[20px] ${active ? 'bg-blue-500 ' :'bg-red-400'} `} >
    <Link to={linkto}>{children}</Link>
    </div>

  )
}

export default Button