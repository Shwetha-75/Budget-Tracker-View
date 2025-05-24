import React from 'react'
import axios from "axios"
import Success from './Success';
import Failed from './Failed';
import { useNavigate } from 'react-router-dom';
// import 'intl-tel-input/build/css/intlTelInput.css';
// import intlTelInput from 'intl-tel-input';
// import $ from 'jquery'; // Ensure you have jQuery available

import PasswordStatus from "./PasswordStatus";
import "./main.css"
    export default function Main(props) {
        const navigate = useNavigate();
        const [userData,setUserData]=React.useState({
            first_name:'',
            last_name:'',
            phone:0,
            gender:'',
            password:'',
            confirm_password:'',
            mail:'',  
        }   );
        const [userStatus,setUserStatus]=React.useState(false);
        const handleOnChange=(event)=>{
            const {name,value}=event.target;
            setUserData(prev=>({
                ...prev,
                [name]:value
            }))
            
        };
        
        
        const [userPwdStatus,setUserPwdStatus]=React.useState({status:false,message:''})
        
        const handleOnSubmit=async (event)=>{
            event.preventDefault();
            const pwd_check=password_criteria_check(userData.password,userData.confirm_password)
            if(!pwd_check[0]){
                // validate the password criteria
                setUserPwdStatus({
                    status:true,
                    message:pwd_check[1]
                })
            }
        else
        {
            setUserPwdStatus({
                status:false,
                message:''
            })
            try{
                const formData = new FormData()
                formData.append("first_name",userData.first_name)
                formData.append("last_name",userData.last_name)
                formData.append("phone",userData.phone)
                formData.append("gender",userData.gender)
                formData.append("password",userData.password)
                formData.append("confirm_password",userData.confirm_password)
                formData.append("mail",userData.mail)
             
                const response=await axios.post("http://127.0.0.1:7000/register-services",formData,{ 
                    
                    headers: {
                       'Content-Type':'multipart/form-data'
                                         
                    }})
                  
                    setUserStatus(response.data.status);
                    if(response.data.status==='ok'){
                        navigate("/login")
                    }else{
                        navigate("/ ")
                    }
                    
                }catch(error){
                    console.log("Error while registration-"+error);
                }
            }
        
        };
      
        
         
        return(
      <div className='register-form h-[550px]'>
        <h1 className='heading--login mt-[3%] text-center'>Sign Up</h1>
           <form onSubmit={handleOnSubmit}
           className='w-100 justify-center mt-[15%]'>
            <div className='input--outline--tag'>
                <label>
                Enter Your First Name{' '}
                <span className='text-red-500'>*</span>
                {' '}:
                </label>
                <input 
                className='input--tag mt-[3%] px-3 py-3 w-[90%] ml-[5%]'
                type='text' 
                name='first_name' 
                value={userData.first_name}
                onChange={handleOnChange}
                required 
                />
            </div>
                <br></br>
                <div className='input--outline--tag'>

                <label>
                Enter Your Last Name
                {' '}
                <span className='text-red-500'>*{' '}</span>
                :
                </label>
                <input 
                className='input--tag mt-[3%] px-3 py-3 w-[90%] ml-[5%]'
                type='text' 
                name='last_name' 
                value={userData.last_name}
                onChange={handleOnChange}
                required 
                />
                </div>
                <br></br>
                <div className='input--outline--tag'>

                <label>
                Enter Your Mail{' '}
                <span className='text-red-500'>*</span>
                {' '}:</label>
                <input 
                className='input--tag mt-[3%] px-3 py-3 w-[90%] ml-[5%] '
                type='mail' 
                name='mail' 
                value={userData.mail} 
                onChange={handleOnChange}
                required
                />
                </div>
                <br></br>
                <div className='input--outline--tag'>
                <label>
                Enter Your Contact Number
                {' '}<span className='text-red-500'>*</span>
                {' '}:
                </label>
                <input 
                className='
                input--tag      
                mt-[3%]
                px-3 
                py-3 
                w-[90%] 
                ml-[5%] '
                type='tel' 
              pattern="[0-9]{5}[0-9]{5}" title="Please enter a whole number"
                name='phone' 
                value={userData.phone}
                onChange={handleOnChange}
                required 
                />
                </div>
                <br></br>
              
                   <div className='w-[70%] ml-[15%] flex justify-between'>
                   
                <label htmlFor='female' className={`label--tag--gender text-sky-300 ${userData.gender==='female'?'activate':''}` }
                >
                        Female
                        <input
                        className='text-sky-500 radio--tag'
                        id="female"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={userData.gender==='female'}
                        onChange={handleOnChange}

                        />
                    </label>
                      
                    <label htmlFor='male' className={`label--tag--gender text-sky-300 ${userData.gender==='male'?'activate':""}`}>
                        Male
                        <input
                          className='text-sky-500  radio--tag'
                          id="male"
                          type="radio"
                          name="gender"
                          value="male"
                          checked={userData.gender==='male'}
                          onChange={handleOnChange}
                          
                          />
                          </label>
                    <label htmlFor='others' className={`label--tag--gender text-sky-300 ${userData.gender==='others'?'activate':""}`}>
                        Others
                        <input
                          className='text-sky-500 radio--tag'
                          type="radio"
                          id='others'
                          name='gender'
                          value='others'
                          checked={userData.gender==='others'}
                          onChange={handleOnChange}
                          
                          />
                          </label>
                        </div>
                    <br></br>
                    <div className='input--outline--tag mt-[10%]'>
                    <label>Enter the password
                        {" "}<span className='text-red-500'>*</span>
                    {" "}
                    </label>
                    <input
                    type='password'
                    className='input--tag mt-[3%] px-3 py-3 w-[90%] ml-[5%]'
                    name='password'
                    value={userData.password}
                    onChange={handleOnChange}
                    required
                    />
                    </div>
                    <br></br>
                    <div className='input--outline--tag'>

                    <label>Enter the confirm password
                        {" "}
                        <span className='text-red-500'>*</span>{" "}:
                    </label>
                    <input
                    className='input--tag mt-[3%]  px-3 py-3 w-[90%] ml-[5%]'
                    type='password'
                    name='confirm_password'
                    value={userData.confirm_password}
                    onChange={handleOnChange}
                    required />
                    <br></br>
                    </div>
                    <ul className='w-[80%] ml-[10%] mt-[3%]  pwd--criteria--tag'>
                        <p>Password Criteria {' '}: </p>
                        <li>At least one lower case</li>
                        <li>At least one upper case</li>
                        <li>At least one numeric character</li>
                        <li>At least one special case [~,!,@,#,$,%,^,&,*]</li>
                        <li>Password of length between [8-15] </li>
                        
                    </ul>
                    <input
                   className='btn w-[80%] mt-[8%] px-3 py-3 ml-[10%] text-center'
                    type='submit'
                    value='Submit'
                    />
                   </form>

       {userStatus==='ok' && !userPwdStatus.status && <Success/>}
       {userStatus==='no' && !userPwdStatus.status && <Failed/>}

       {userPwdStatus.status && 
       <PasswordStatus 
       message={userPwdStatus.message}
       />}

       <input
       onClick={props.onClick}
       className='btn 
       w-[80%] mt-[5%] 
       px-3 py-3 
       mb-10 
       ml-[10%] 
       mt-[20%] 
       text-center'
       type='button'
       value='Back to Sign-In'
       >
       </input>
    </div>
  )
};

function password_criteria_check(password,conf_password){
    if(password.length<8 )return [false,"password is weak"];
    if(password.length>15)return [false,"password length is exceeding!"];
    if(password.length!==conf_password.length) return [false,"password does not match !"];
    if(password!==conf_password) return false;
    // check the criteria
    let result_1=password.match('[a-z]');
    let result_2=password.match('[A-Z]');
    let result_3=password.match(/\d/g);
    let result_4=password.match(/[~!@#$%^&*]/g);
    return [result_1!==null && result_2!==null && result_3!==null && result_4!==null,"please check the password criteria !"];


}