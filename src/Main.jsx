import React from 'react'
import LoginForm from './HomePage/LoginForm';
import Register from "./Registeration/Main";
import BarChart from './ComponentBar/Bar';
import PieChart from "./ComponentBar/PieChart";

export default function Main() {
  const [login,setLogin]=React.useState(true);
  const [register,setRegister]=React.useState(false);

  const handleOnClick=(value)=>{
    if(value==='login'){
      setLogin(true);
      setRegister('register')
    }
    else{
      setLogin(false);
      setRegister(true);
    }
  }

  return (
    <div className='bg-black-900 bg:opacity-50 flex  w-[100%]'>
    <div className='w-[50%] ml-[5%]  '>
<div className='w-[50%] h-[30%] mt-[5%]'>

  <BarChart/>
</div>
<div className='w-[100%] h-[20%]'>
<h1 className='heading--tag--title mt-[5%]'>Budget Manager</h1>
</div>
<div className='w-[30%] opacity-30 h-[40%] float-end '>
  <PieChart/>
</div>
    
    </div>
    <div className=' w-[30%] ml-[5%] h-[550px]  mt-[5%] rounded-[10px] border border-gray-900'>
  
  
  {login && <LoginForm
    onClick={handleOnClick}
    />}
    {register && <Register/>}
    </div>
    </div>
  )
}
