import { useMemo } from "react";
import React from 'react'
// import { Expenses } from "../App";
import styled from "styled-components";

const Panel=styled.div`   
   flex:1;
   `
function ControlledComponents({costAmount,expense,handleOnChangeExpense,setEditTitleStatus,setAddMoneyStatus}) {
    
     React.useEffect(()=>{
      const elementExpense=document.querySelector("#activate--input--tag--expense");
        const handleOnFocus=(element)=>{
          if(document.activeElement!==element){
            document.activeElement.blur();
            element.focus();
          }
        }
        elementExpense.addEventListener('click',handleOnFocus(elementExpense));
        elementExpense.removeEventListener('click',handleOnFocus(elementExpense));
     });

    const optimisedControlledComponent=useMemo(()=>{
  return (
    <Panel>

        <input
        id="activate--input--tag--expense"
        className=" bg-transparent text-color input--tag--expense"
        type="number"
        name="expense"
        required
        pattern="\d*" 
        value={expense||''}
        onChange={handleOnChangeExpense}
        />  
        <input
        className="activate--input--tag bg-transparent text-color input--tag--expense"
        type="text"
        name="expense"
        value={costAmount}
      
        readOnly
        /> 

   <div className="mt-[5%]">
    <button className="border border-yellow-500  p-4 w-[50%] text-center text-white" 
      onClick={()=>{
        setAddMoneyStatus(false)
        setEditTitleStatus(true)}}
    >Next</button>
    <button className="border border-yellow-500  p-4 w-[50%] text-center text-white">Reset</button>
  </div>

       
    </Panel>
  )
},[handleOnChangeExpense,expense,setEditTitleStatus,setAddMoneyStatus,costAmount])
return (
  <>
  {optimisedControlledComponent}
  </>
)
};
export default React.memo(ControlledComponents);