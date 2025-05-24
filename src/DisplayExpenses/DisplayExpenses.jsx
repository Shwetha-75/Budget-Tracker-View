import React from 'react';
import {ExpensesObject} from "../App";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import {UserObject} from "../App";

// import { UserObject } from '../App';
export default function DisplayExpenses() {
   
  const {expensesObject,setExpensesObject}=React.useContext(ExpensesObject);
  // const {userObject,setUserObject} = React.useContext(UserObject);
  const {userObject,setUserObject}=React.useContext(UserObject);
  const [status,setStatus]=React.useState('')
  const handleOnClick=async(id)=>{
       
        setExpensesObject((prev)=>{
              return prev.filter((item)=> item.id!==id)
        });
        setStatus('delete');
        
        // connecting with the backend 
        try{
          const formData = new FormData();
          formData.append("mail",userObject?.mail);
          formData.append('id',id);
          formData.append("expense_amt",userObject?.expense_amt);
          formData.append("savings",userObject?.savings);
          
          const response = await axios.post("http://localhost:7000/delete-expense",formData,{
            headers:{
              'Content-Type':'multipart/form-data'
            },
            withCredentials:true
            
          });
          setUserObject(prev=>{
             return{
               ...prev,
               expenditure:expensesObject.filter((item)=>item.id!==id),
               savings:response.data.savings,
               expense_amt:response.data.expense_amt
            }
          }
          );
             
        }catch(error){

        }
  }

  // React.useEffect(()=>{
  //   (async()=>{
  //      try{
  //       const response=await axios.post("http://localhost:5000/deleteexpense",{
  //          email:userObject.mail,
  //          expenditure:[...expensesObject],
  //           savings:userObject.savings,
  //          status:status
  //       });
  //     setUserObject(response.data.user_model)
  //     }catch(error){
  //       console.log(error)
  //     }
  //   })()
  // })
  
  const array=expensesObject?.map((item)=>
        <div key={item.id}>
            <p className="flex">{item.title}
          <span className="p-2 cursor-pointer"><MdDelete
          onClick={()=>handleOnClick(item.id)}
          /></span>
          <span><MdModeEdit/></span>
            </p>
        <p>Expense Amount : {item.value}</p>
       
        <p>From : {item.dates[Object.keys(item.dates)[0]]}</p>
        <p>To : {item.dates[Object.keys(item.dates)[1]]}</p>
        </div>
      )

  return (
  <>
    <div className="grid grid-flow-row gap-5 text-white border border-gray-500 w-[80%]">
      <div >
         {array}
      </div> 
      

     
    </div>
   
  </>
  )
}
