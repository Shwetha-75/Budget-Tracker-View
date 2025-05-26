import React from 'react';
import LoginFail from "../Component/LoginFail";
import UserStatus from '../ContextAPI/UserStatus';
import UserNotExist from './UserNotExist';
import { useNavigate,useLocation } from 'react-router-dom';
import axios  from 'axios';
import Registration from "../Registeration/Main";
import "./login.css";
import UserObject from '../ContextAPI/UserObject';
import UserDetails from '../ContextAPI/UserDetails';
import ExpensesObject from '../ContextAPI/ExpensesObject';
export default function LoginForm() {
    const navigate =useNavigate();
    const location=useLocation();
    const [loginVisible,setLoginVisible]=React.useState(true);
    const {userStatus,setUserStatus}=React.useContext(UserStatus);
    const {setUserDetails}=React.useContext(UserDetails);
    const {setUserObject}=React.useContext(UserObject);
    const {setExpensesObject}=React.useContext(ExpensesObject);
    
    const[user,setUser]=React.useState({
        mail:'',
        password:''
    });

  const handleOnChange=(event)=>{
    const{name,value}=event.target;
    setUser({...user,[name]:value});
  };
  
  
  const handleSubmit=async (event)=>{
    event.preventDefault();
   const formData = new FormData();
   formData.append("mail",user.mail)
    formData.append("password",user.password);
    
    try{
      const response=await axios.post("http://127.0.0.1:7000/login-service",formData,{
        headers:{
              'Content-Type':'multipart/form-data'
          },
          withCredentials:true
        
      })    
        console.log(response.data)
        setUserDetails(response.data.mail)
        setUserStatus(response.data.status)
        setUserObject(response.data.user_model);
        setExpensesObject(response.data.user_model['expenditure'])
        
    }catch(error){
        console.error(error);
    }
  }
  

  //  facing the issue in browser rendering  while updating the state 

// hook.js:608 
//  Warning: Cannot update a component (`BrowserRouter`) 
// while rendering a different component (`LoginForm`). To 
// locate the bad setState() call inside `LoginForm`, 
// follow the stack trace as described in https://reactjs.org/link/setstate-in-render Error Component Stack

// To avoid this warning in the browser 

React.useEffect(()=>{
  if (userStatus===false|| userStatus==='no'){
    navigate("/")
  }
  if(userStatus==="ok"){
    navigate("/login");
   };

},[userStatus,navigate])
React.useEffect(()=>{
    
    const handleBrowserBackButton=()=>{
      if(location.pathname==='/'){
        navigate(1);
      }
    }
    window.addEventListener("popstate",handleBrowserBackButton);
    return ()=>window.removeEventListener("popstate",handleBrowserBackButton)
   },
   [userStatus,location.pathname,navigate]

 );
  




  return (
    <div className='login--form'>
     {loginVisible&& <>
          <h1 className='heading--login mt-[3%] text-center'>LOGIN</h1>
        <form onSubmit={handleSubmit} 
        className='w-100 justify-center mt-20'>
        
        <div className='input--outline--tag'>
        <label>
            Enter the user name
            {' '}
            <span className='text-red-500'>*</span>
            </label>
            <input
            className='input--tag mt-[3%] px-3 py-3 w-[90%] ml-[5%]'
            type='mail'
            name='mail'
            value={user.mail||''}
            onChange={handleOnChange}
            > 
            </input>
            </div>

            <br></br>
            <div className='input--outline--tag'>
            <label>
                Enter the password
            </label>
            <input
            className='input--tag mt-[3%] px-3 py-3 w-[90%] ml-[5%]'
            type='password'
            name='password'
            value={user.password||''}
            onChange={handleOnChange}
           
            ></input>
            </div>
            <br></br>

            <input 
            className='btn w-[80%] mt-[2%] px-3 py-3 ml-[10%] text-center'
            type='submit'
            value='Submit'></input>
            
        </form>
        {userStatus==='not' && 
        <UserNotExist/>}
       

       {userStatus==='no' &&
       <LoginFail/>}
       <input 
       onClick={()=>{setLoginVisible(false)}}
       className='btn w-[80%] mt-10 px-3 py-3 ml-[10%] text-center'
       type='submit'
       value='Sign-Up'>
           </input>
         </>
      }
       {!loginVisible
       &&
       <Registration
       onClick={()=>setLoginVisible(true)}
       />
       }
    </div>
  )
}
