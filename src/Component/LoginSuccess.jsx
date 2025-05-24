import React from 'react';
import { UserStatus } from '../App';
import "./loginSuccess.css";
import DisplayExpenses from '../DisplayExpenses/DisplayExpenses';
import styled from 'styled-components';
import axios from "axios";
// import Expenses from './Expenses';
import { useNavigate } from 'react-router-dom';
// import { SelectedDatesCalendar } from '../App';
import MainCalender from '../MainCalender/MainCalender';
// import { ExpensesObject } from '../App';
// import { UserDetails } from '../App';
import { Salary } from '../App';
import { UserObject } from '../App';
import PopUpDisplay from '../MainCalender/PopUpDisplay';
import { PopUpDisplayStatus } from '../App';


const Container=styled.div`
    display:flex;

`

const Panel=styled.div`
  flex:2

`

const PanelCalender=styled.div`
    flex:5;
`
export default function LoginSuccess() {

  const {displayPoppUp}=React.useContext(PopUpDisplayStatus);
  const history=useNavigate();

  // const handleOnClickPopUp=()=>{
  //   setDisplayPopUp(prev=>!prev);
  // }
  // initializing the salary variable 
  
  const {salary,setSalary}=React.useContext(Salary);
  const {userObject,setUserObject}=React.useContext(UserObject);
  // const {expensesObject}=React.useContext(ExpensesObject);
  
  
  const handleOnChangeSalary=(event)=>{
    event.preventDefault();
   

    setSalary(event.target.value);                             
}

 
  const {setUserStatus}=React.useContext(UserStatus);
  
  const handleOnClickLogout=()=>{
    setUserStatus(false);
    localStorage.removeItem('userStatus')
    history("/")
  }

  // React.useEffect(()=>{
  //   setUserObject(prev=>({
  //     ...prev,
  //     salary:salary||prev.salary
  //   }))
  // },[setSalary,salary,setUserObject]);


//  React.useEffect(()=>{

//  localStorage.setItem('userStatus',JSON.stringify(userStatus))

//   let timeOutId=setTimeout(async ()=>{
  
//       if (salary==='') return ;
       
//       const form={
//       salary:salary,
//       expenses:[...expensesObject],
//       mail:userObject.mail,
//       status:'add'
//     }
//   //  connecting with backend
//    try{ 
//       console.log("Sending the data")
//     const response=await axios.post("http://127.0.0.1:4000/data",
//       form,{
//       Headers:{

//         'Content-Type': 'application/json' 
//       } 
//          })

//          console.log(response.data.user_model)
//           //  sessionStorage.setItem('user_object',response.data.user_model)
//          }catch(error){
//            console.error(error);
//          }
//          },5000);
//          return ()=>clearTimeout(timeOutId);

//  },[salary,expensesObject,userStatus,userObject,setUserObject]);
  


  const handleOnSaveSalary = async(event)=>{
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append("salary",salary);
      formData.append("email",userObject.mail);
      formData.append("savings",userObject.savings);
      formData.append('expense',userObject?.expenditure)
 
      const response=await axios.post("http://localhost:7000/salary-update",formData,{
           headers:{
               'Content-Type':'multipart/form-data'
           },
          withCredentials:true

      });
      const data = response.data
      setUserObject({
        ...userObject,
        salary:salary,
        savings:data.data_model.savings
      })
      
      
    }catch(error){
      console.log(error)
    }

  }
   
 return (

    <Container className="">

      <Panel  className='panel--tag'>

      <div className='text-center text-sky-300 mt-4 '>Logged In Successfully !!
      <button onClick={handleOnClickLogout}>Logout</button>
      <div className='w-[80%]  ml-[10%]  mt-[10vh]'>
        <div className=' mt-[5%]'>

        <form onSubmit={handleOnSaveSalary} method="POST">

          <label>Enter the Salary Annual</label>
        <div className='mt-[2%] w-[100%] outline--input--tag  '>
          
        <input 
        type='text'  
        className='w-[100%] input--tag--login' 
        name="salary" 
        value={salary||""} 
        onChange={handleOnChangeSalary} 
        required
        >
        </input>
        <br></br>
          </div>

          <div>
            <button type="submit" 
            className="p-3 w-[30%] rounded-sm mt-[2%] border border-slate-500">Save</button>
          </div>
          
        </form>
       
        <div className='mt-[2%] w-[100%] outline--input--tag'>
        <label>Enter the Salary Annual</label>
        <input
        type="text"
        className='w-[100%] input--tag--login'
        name="salary"
        value={salary||userObject?.salary||""}
        readOnly
        />
        </div>
        </div>

        <div className='mt-[2%] w-[100%] outline--input--tag  mr-[3%]'>
          <label>Expenditure Annually</label>
        <input 
        className='w-[100%] input--tag--login' 
        name="expense_amt"
        value={userObject?.expense_amt||""}
        readOnly
        >
        </input>
    
        </div>
        <div className='mt-[2%] w-[100%] outline--input--tag  '>
          <label>Savings Annually</label>
        <input 
        type='text'  
        className='w-[100%] input--tag--login' 
        name="salary" value={userObject?.savings||""} 
        onChange={handleOnChangeSalary} 
        required
        readOnly
        >
        </input>  
        </div>
        </div>

        <div className='mt-[2%]'>
  
       </div>
    
      </div>

      <div className='flex flex-col items-center justify-center'>
           <DisplayExpenses/>
      </div>
         
      </Panel>
      
      <PanelCalender className="relative w-100" >
        <MainCalender />
      </PanelCalender>

      {displayPoppUp && <PopUpDisplay />}

   
         </Container>
  )
}
