import React from 'react'
import styled from "styled-components";

const Panel=styled.div`
     flex:1;
`
export default function TitleControlledComponents({title,setTitle,setAddMoneyStatus,setEditTitleStatus,handleOnSubmitCreateExpense}) {


  React.useEffect(()=>{
    const element=document.querySelector("#activate--input--tag--title");
    const handleOnFocus=(element)=>{
      if(document.activeElement!==element){
        document.activeElement.blur();
        element.focus();
      //  console.log("Activate element: ",document.activeElement===element)
      }
    }

    element?.addEventListener("click",handleOnFocus(element));
    element?.removeEventListener("click",handleOnFocus(element))

  })
  return (
    <Panel>
      <button className="border border-yellow-500 w-[30%] float-left p-4  text-white" 
      onClick={()=>{
      setAddMoneyStatus(true)
      setEditTitleStatus(false)

      }}>Previous</button>
      <input
        id="activate--input--tag--title"
        className=" bg-transparent text-white mt-[10%] input--tag--expense"
        type="text"
        name="title"
        value={title}
        required
        onChange={(e)=>setTitle(e.target.value)}
        /> 

      <div className="mt-[5%]">
        <button className="border border-yellow-500 w-[40%] mr-[10%] p-4 text-center text-white" 
        onClick={handleOnSubmitCreateExpense}
        >Save</button>
        <button className="border border-yellow-500 w-[40%] p-4 text-center text-white">Cancel</button>
      </div>

    </Panel>
  )
}
